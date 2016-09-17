angular.module("hanziLearner")
  .controller("hanziCtrl", function($scope, mainSrv, hanziSrv){
    $scope.test = "HANZI";

    $scope.characters = mainSrv.getCharacters();

    $scope.radDisplay = false;

    $scope.toggleRadDisplay = function(){
      $scope.radDisplay = !$scope.radDisplay;
    }

    $scope.displaySearch = function(){
    }

    $scope.searchChars = function(initPin, initDef, initRad){

    }

    $scope.radicals = hanziSrv.getRadicals();

  });
