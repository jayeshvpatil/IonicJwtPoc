
/**
 * Created by Jay on 11/22/14.
 */

'use strict';

angular.module('ionicJwt')
    .controller('LoginCtrl',function($scope,$http,auth,alert){
        var user={};
        $scope.submit   = function(){
         auth.login($scope.email,$scope.password)
                .success(function(res){
                    alert('balanced','Welcome','Thanks for coming back ,'+res.user.email+'!');

                    // $state.go('app.main');
                })
                .error(handleError);
        };
        $scope.google = function(){
            auth.googleAuth().then(function(res) {
                alert('balanced','Welcome','Thanks for coming back ,'+res.user.displayName+'!');

            },handleError);
        }
        function handleError(err){
            alert('assertive','Oops!',err.message);
        }
    });