/**
 * Created by Jay on 11/18/14.
 */
'use strict';
angular.module('ionicJwt').
    controller('logoutCtrl',function(authToken,$state)
    {
        authToken.removeToken();
        $state.go('app.main');
    });
