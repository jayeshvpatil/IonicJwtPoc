/*
 * Created by Jay on 11/22/14.
 */
angular.module('ionicJwt').service('auth', function auth($http,API_URL,authToken,$state,$q) {
    var url=API_URL;

    function authSuccessful(res){
        authToken.setToken(res.token);
        $state.go('app.main');
    }
    this.login=function(email,password){
        return  $http.post(url+'login',{
            email: email,
            password: password
        })
            .success(authSuccessful);

    }

    this.register=function(email,password){
        return  $http.post(url+'register',{
            email: email,
            password: password
        })
            .success(authSuccessful);

    }
    var urlBuilder=[];
    var clientId='550677630638-hh6cr8fa5au2re43n36fqqk6q3k9501u.apps.googleusercontent.com';
    urlBuilder.push('response_type=code',
                    'client_id='+clientId,
                    'redirect_uri='+window.location.origin,
                     'scope=email profile');




    this.googleAuth = function(){

        var googleUrl='https://accounts.google.com/o/oauth2/auth?'+urlBuilder.join('&');

        var deferred= $q.defer();
        var browser = window.open(googleUrl, '_blank', 'location=no,enableViewportScale=yes,closebuttoncaption=Back');
        window.focus();
        window.addEventListener('message',function(event){
            if(event.origin===window.location.origin){
             console.log(event.data);
                var code=event.data;
                browser.close();
                $http.post(API_URL+'auth/google',{
                    code:code,
                    clientId:clientId,
                    redirectUri:window.location.origin
                    }).success(function(jwt){
                          authSuccessful(jwt);
                            deferred.resolve(jwt);
                        });

            }
        });
        return deferred.promise;
    }
});