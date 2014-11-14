angular.module('archuploadApp')
    .service('ProjectServices', function(Restangular, $state) {

        var baseApi = Restangular.all('api');

        return {
            create: function(project) {
                return baseApi.all('projects').post(project);
            },
            getProjectsByUnikey: function(unikey){
                return baseApi.all('projects').one('unikey',unikey).getList();
            },
            getProjectsByStudio:function(studio){
                return baseApi.all('projects').one('studio',studio).getList();
            },
            get: function(id){
                return baseApi.one('projects', id).get();
            },
            deleteProject: function(id){
                return baseApi.one('projects', id).remove();
            },
            update: function(id, update){
                return baseApi.one('projects', id).customPUT(update);  
            },
            getStudio: function(id){
                return baseApi.one('studios',id).get();
            },
            getStudios: function(){
                return baseApi.all('studios').getList();
            },
            createStudio: function(project) {
                return baseApi.all('studios').post(project);
            },
            getNames: function(){
                 return baseApi.all('unikeys/names').getList();
            }
            
        }
    })
