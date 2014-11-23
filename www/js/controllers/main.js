/**
 * Created by Jay on 11/23/14.
 */

'use strict';
angular.module('ionicJwt').
    controller('MainCtrl',function($scope,authToken)
    {
        $scope.isAuthenticated= authToken.isAuthenticated ;

    });
