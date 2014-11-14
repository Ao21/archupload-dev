'use strict';

angular.module('archuploadApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Unikey, transformRequestAsFormPost, ProjectServices, $upload ) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.allStudents = Unikey.query();
    $scope.files = [];
    $scope.imageUploads = [];

    ProjectServices.getStudios().then(function(data){
      $scope.allStudios = data.plain();
    });

    $scope.uploadFile2 = function(files){
       var fd = new FormData();
      fd.append("file", files[0]);
      console.log(files[0]);
      $http.post('api/unikeys/upload', fd, {
              headers: {'Content-Type': undefined },
              transformRequest: angular.identity
          }).success( console.log('yay') ).error( console.log('damn!') );

    }

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

     $scope.createStudio = function(){
        //console.log($scope.project);
        //console.log($scope.files);

        var studioUpload = $scope.newStudio;
        var fileArray = [];
        for (var i = $scope.files.length - 1; i >= 0; i--) {
            fileArray.push($scope.files[i].uploadData)
        };
        //studioUpload.unikey = $scope.currentStudent.unikey
        studioUpload.files = fileArray;
        console.log(studioUpload);
        ProjectServices.createStudio(studioUpload).then(function(data){
             console.log(data)
        });
    }




      $scope.removeFile = function(index){
          $scope.files.splice(index, 1);
      }


      $scope.uploadFile = function($file){
          var file = $file;

           $http.get('/api/aws/s3Policy?mimeType=' + $file.type).success(function(response) {

                      var s3Params = response;
                      console.log(s3Params);
                      $upload.upload({
                          url: 'https://' + 'archusyd' + '.s3-ap-southeast-2.amazonaws.com/',
                          method: 'POST',
                          data: {
                              'key': 'architecture/2014Exhibition/studioImages/' + Math.round(Math.random() * 10000) + '$$' + $file.name,
                              'acl': 'public-read',
                              'Content-Type': $file.type,
                              'AWSAccessKeyId': 'AKIAIRT6MA7UDDLPWPVA',
                              'success_action_status': '201',
                              'Policy': s3Params.s3Policy,
                              'Signature': s3Params.s3Signature
                          },
                          file: $file,
                      }).then(function(response) {
                          $file.progress = parseInt(100);

                          if (response.status === 201) {
                              var data = xml2json.parser(response.data),
                                  parsedData;
                              parsedData = {
                                  location: data.postresponse.location,
                                  bucket: data.postresponse.bucket,
                                  key: data.postresponse.key,
                                  etag: data.postresponse.etag,
                                  type: 0

                              };
                              file.uploadData = parsedData;
                              //$scope.imageUploads.push(parsedData);

                              $scope.formFileInvalid = false;


                          } else {
                              alert('Upload Failed');


                          }
                      }, null, function(evt) {
                          $file.progress = parseInt(100.0 * evt.loaded / evt.total);
                          //$('#' + file.id).children('#progress').html(parseInt(100.0 * evt.loaded / evt.total));

                      });
                  });
      }







      $scope.onFileSelect = function($files) {
          //$files: an array of files selected, each file has name, size, and type.
          $scope.upload = [];
          var idCount = 0;

          for (var i = 0; i < $files.length; i++) {
              $scope.files.push($files[i]);

              $scope.formFileInvalid = true;
              var file = $files[i];
              file.id = 'fileId' + idCount;
              idCount++;
              file.progress = parseInt(0);

            

          }
      };

     
    
  });
