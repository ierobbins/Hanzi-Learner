angular.module("hanziLearner")
  .controller("homeCtrl", function($scope, $state, profileSrv){

    $scope.logIn = function(initUser, initPass){
      if(profileSrv.logIn(initUser, initPass) !== null){
        profileSrv.setCurrent(initUser);
        $state.go("profile");
      } else{

      }
    }

  });
