
angular.module('ionicJwt', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var params = window.location.search.substring(1);
    //  console.log(params);
      if(params && window.opener && window.opener.location.origin===window.location.origin)
      {
          var pair= params.split('=');
          var code = decodeURIComponent(pair[1]);
          window.opener.postMessage(code,window.location.origin);
      }

  });
})

.config(function($stateProvider,$urlRouterProvider,$httpProvider){
        $stateProvider
         .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "views/menu.html",
            controller:"MenuCtrl"
        })
            .state('app.main',{
                url:"/main",
                views: {
                    'menuContent': {
                        templateUrl: "views/main.html"
                    }

                },
                controller:"MenuCtrl"
            })
            .state('app.pref', {
                url: "/pref",
                views: {
                    'menuContent': {
                        templateUrl: "views/pref.html"

                    }
                }
            })


            .state('register', {
                url: '/register',
                templateUrl:"views/register.html",
                controller:"RegisterCtrl"
            })
            .state('login', {
                url: '/login',
                templateUrl:"views/login.html",
                controller:"LoginCtrl"
            })
            .state('logout', {
                url: '/logout',
                controller:"logoutCtrl"
            })
            .state('app.places', {
                url: '/places',
                views: {
                    'menuContent': {
                        templateUrl: "views/places.html"
                    }

                },
                controller:"PlacesCtrl"
            });

        // fallback route
        $urlRouterProvider.otherwise('/app/main');
        $httpProvider.interceptors.push('authInterceptor')
    })
.constant('API_URL',"http://localhost:3000/");
