
'use strict';

angular.module('ionicJwt')
    .controller('RegisterCtrl',function($scope,$http,alert,auth){
        var user={};
        $scope.submit   = function(){
            auth.register($scope.email,$scope.password)
                .success(function(res){
                    alert('balanced','Account Created!','Welcome,'+res.user.email+'!');

                })
                .error(function(err){
                    alert('assertive','Oops!',err.message);
                });
        };
    });