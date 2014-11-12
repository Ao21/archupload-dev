'use strict';

angular.module('archuploadApp')
  .controller('UploadCtrl', function ($scope, $http, socket, $upload,$timeout, ProjectServices) {
    $scope.uniKeyList = [];
    $scope.currentStudent;
    $scope.hideform = false;
    $scope.noStudent = true;
    $scope.hideMain = true;
    $scope.hideAddProject = true;
    $scope.hideEditProject = true;
    $scope.imageUploads = [];
    $scope.form = {};
    $scope.files = [];
    $scope.currentQuestion=0;


    $http.get('/api/unikeys').success(function(uniKeyList) {
      $scope.uniKeyList = uniKeyList;
    });

 
    $scope.selected = undefined;
    //$scope.states = ['BDES1010 Architecture Studio 101','BDES1020 Studio 201','BDES3010 Studio 301','MARC4001 Urban Architecture Research Studio','MARC4002 Sustainable Architecture Research Studio','MARC4003 Digital Architecture Research Studio','MARC5001 Graduation Studio'];

    ProjectServices.getStudios().then(function(data){
        console.log(data.plain());

      $scope.states = _.map(data.plain(), 'name');
    });

    $scope.getProject = function(project){
        ProjectServices.get(project._id).then(function(data){
                        $scope.selectedProject = data.plain();
                        $scope.regenerateRedactor();
                    });

        $scope.hideMain = true;
        $scope.hideEditProject = false;


    }



    $scope.submitForm = function(isValid){

            // check to make sure the form is completely valid
            if (isValid) {
                var checkUniObject = {
                    unikey: $scope.studentLoginForm.unikey,
                    studentNo: $scope.studentLoginForm.studentNo
                };
                $http.post('/api/unikeys/check', checkUniObject).success(function(response){
                    $scope.currentStudent = response;
                    console.log($scope.currentStudent);
                    ProjectServices.getProjectsByUnikey($scope.currentStudent.unikey).then(function(data){
                        //console.log(data);
                        $scope.projects = data;
                    });

                    $scope.noStudent = false;
                    $scope.hideMain = false;
                    $timeout(function(){
                        $scope.hideform = true;
                    },500)

                }).error(function(response){
                    $scope.noStudent = true;
                    $scope.error = response;
                })
            }

        
       
    }

    $scope.validate = function(){
        if($scope.currentQuestion===0){
            if( $scope.addProjectForm.projectName.$invalid===false && $scope.addProjectForm.projectName.$pristine===false){
                return true;
            }
                else{
                return false;
            }
        }
        else if($scope.currentQuestion===1){

            if( $scope.addProjectForm.projectStudio.$valid===true  && $scope.addProjectForm.projectStudio.$pristine===false){
                return true;
            }
                else{
                return false;
            }
        }
        else if($scope.currentQuestion===2){

           return true;
        }
        else if($scope.currentQuestion===3){
           return true;
        }
        else if($scope.currentQuestion===4){
           return true;
        }
        else{
            return false;
        }

        
    }

    $scope.createProject = function(){

        var projectUpload = $scope.project;
        var fileArray = [];
        for (var i = $scope.files.length - 1; i >= 0; i--) {
            fileArray.push($scope.files[i].uploadData)
        };
        projectUpload.unikey = $scope.currentStudent.unikey
        projectUpload.files = fileArray;
        projectUpload.author = $scope.currentStudent._id;
        ProjectServices.create(projectUpload).then(function(data){
             ProjectServices.getProjectsByUnikey($scope.currentStudent.unikey).then(function(data){
                        //console.log(data);
                        $scope.projects = data.plain();
                        $scope.hideMain = false;
                        $scope.hideAddProject = true;
                        $scope.files = [];

                    });
        });
    }


    $scope.nextQuestion = function(){
        $scope.currentQuestion++;
    }

    $scope.updateProject = function(){
        ProjectServices.update($scope.selectedProject._id, $scope.selectedProject).then(function(data){
             $scope.selectedProject = data.plain();
        })
    }

    $scope.lastQuestion = function(){
        $scope.currentQuestion--;
    }

    $scope.openAddProject = function(){
        $scope.hideMain = true;
        $scope.hideAddProject = false;
        $scope.files.length = 0;
        $scope.project.name = "", $scope.project.studio = "", $scope.project.summary = "", $scope.project.detail = "";
    }

    $scope.closeWindow = function(){
         ProjectServices.getProjectsByUnikey($scope.currentStudent.unikey).then(function(data){
                        //console.log(data);
                        $scope.projects = data.plain();
                        $scope.hideAddProject = true;
                         $scope.hideEditProject = true;
                         $scope.hideMain = false;
                         $scope.currentQuestion=0;
                         $scope.selectedProject = "";
                         $scope.files = [];

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
                            'key': 'architecture/2014Exhibition/' + $scope.currentStudent.unikey + '/' + Math.round(Math.random() * 10000) + '$$' + $file.name,
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


    $scope.editProjectAddFile = function($file, index){
        var file = $file;

         $http.get('/api/aws/s3Policy?mimeType=' + $file.type).success(function(response) {

                    var s3Params = response;
                    console.log(s3Params);
                    $upload.upload({
                        url: 'https://' + 'archusyd' + '.s3-ap-southeast-2.amazonaws.com/',
                        method: 'POST',
                        data: {
                            'key': 'architecture/2014Exhibition/' + $scope.currentStudent.unikey + '/' + Math.round(Math.random() * 10000) + '$$' + $file.name,
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

                            $scope.selectedProject.files.push(parsedData);
                            $scope.files.splice(index, 1);
                            ProjectServices.update($scope.selectedProject._id, $scope.selectedProject).then(function(data){
                                 $scope.selectedProject = data.plain();
                            })


                        } else {
                            alert('Upload Failed');


                        }
                    }, null, function(evt) {
                        $file.progress = parseInt(100.0 * evt.loaded / evt.total);
                        //$('#' + file.id).children('#progress').html(parseInt(100.0 * evt.loaded / evt.total));

                    });
                });
    }

    $scope.deleteFile = function(file, index){
       

       $scope.selectedProject.files.splice(index, 1);




       ProjectServices.update($scope.selectedProject._id, $scope.selectedProject).then(function(data){
             $scope.selectedProject = data.plain();
        })
        

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

   
  })
.directive('iconic', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        console.log('iconic injected');
         IconicJS().inject(element);
     
    }
  }
});