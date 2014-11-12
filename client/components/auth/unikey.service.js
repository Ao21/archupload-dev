'use strict';

angular.module('archuploadApp')
  .factory('Unikey', function ($resource) {
    return $resource('/api/unikeys/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
