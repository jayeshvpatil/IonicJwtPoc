/**
 * Created by Jay on 11/16/14.
 */
'use strict';

angular.module('ionicJwt')
    .service('alert',function alert($rootScope,$timeout){
        return function(type,title,message, timeout){
            var alertTimeOut;
            $rootScope.alert={
                hasBeenShown:true,
                show:true,
                type:type,
                message:message,
                title:title
            };
            $timeout.cancel(alertTimeOut);
            alertTimeOut =$timeout(function(){
                $rootScope.alert.show=false;
            },timeout||2000);

        }
    });
