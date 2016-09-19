angular.module("hanziLearner")
  .controller("profileCtrl", function($scope, profileSrv){

    $scope.currentUser = profileSrv.getCurrentUser();

    $scope.reviewChars = function(type){
      var revQuiz = profileSrv.constructReview(type);
      profileSrv.reviewStuff(revQuiz);
    }


  });
