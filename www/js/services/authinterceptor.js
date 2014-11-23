/**
 * Created by Jay on 11/21/14.
 */
/**
 * Created by Jay on 11/17/14.
 */
angular.module('ionicJwt').factory('authInterceptor', function (authToken) {
    return{
    request: function(config){
        var token= authToken.getToken();
        if(token)
        config.headers.Authorization='Bearer '+ token;
        return config;
    },
    response:function(response){
        return response;
    }
    };
});