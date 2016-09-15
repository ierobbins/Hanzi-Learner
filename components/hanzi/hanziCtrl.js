angular.module("hanziLearner")
  .controller("hanziCtrl", function($scope, mainSrv){
    $scope.test = "HANZI";

    $scope.characters = mainSrv.getCharacters();
  });
