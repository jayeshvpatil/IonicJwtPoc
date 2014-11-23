/**
 * Created by Jay on 11/19/14.
 */

'use strict';

angular.module('ionicJwt')
    .controller('PlacesCtrl',function($scope,$http,API_URL,alert){
        $http.get(API_URL+'places').success(function(places){
            $scope.places=places;
        }).error(function(err){
            alert('assertive','Unable to get places',err.message);
        })

    });