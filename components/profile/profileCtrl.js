angular.module("hanziLearner")
  .controller("profileCtrl", function($scope, profileSrv){

    $scope.currentUser = profileSrv.getCurrentUser();


  });
