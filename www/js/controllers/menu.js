
    'use strict';
    angular.module('ionicJwt').
        controller('MenuCtrl',function($scope,authToken,$ionicModal,$ionicSideMenuDelegate)
    {

        $scope.isAuthenticated= authToken.isAuthenticated ;

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }



        $scope.showSettings = function ($scope) {
            if (!$scope.settingsModal) {
                // Load the modal from the given template URL
                $ionicModal.fromTemplateUrl('settings.html', function (modal) {
                    $scope.settingsModal = modal;
                    $scope.settingsModal.show();
                }, {
                    // The animation we want to use for the modal entrance
                    animation: 'slide-in-up'
                });
            } else {
                $scope.settingsModal.show();
            }
        }
        $scope.closeSettings = function ($scope) {
            $scope.modal.hide();
        }





    });


