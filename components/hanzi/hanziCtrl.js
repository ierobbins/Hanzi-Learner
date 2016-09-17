angular.module("hanziLearner")
  .controller("hanziCtrl", function($scope, mainSrv, hanziSrv){

    $scope.characters = mainSrv.getCharacters();

    $scope.radDisplay = false;

    $scope.toggleRadDisplay = function(){
      $scope.radDisplay = !$scope.radDisplay;
    }

    $scope.searchReturn = [];

    $scope.selectedRadical = "";

    $scope.selectRadical = function(initRad){
      $scope.selectedRadical = initRad;
      $scope.radDisplay = false;
    }

    $scope.removeRadical = function(){
      $scope.selectedRadical = "";
    }

    //CREATES AND RETURNS AN ARRAY THAT FILTERS OUT ALL ELEMENTS NOT IN THE PARAMETERS
    $scope.displaySearch = function(initPin, initDef, initRad){
      var flag = true;
      $scope.searchReturn = [];
      $scope.characters.forEach(function(item, index){
        flag = true;
        if(initPin){
          if(!containsString(initPin, item.pinyin[0])){
            flag = false;
          }
        }
        if(initDef){
          if(!containsString(initDef, item.definition)){
            flag = false;
          }
        }
        if(initRad){
          if(!containsRadical(item.radical, item.character)){
            flag = false;
          }
        }
        if(flag){
          item.pinyin = item.pinyin[0];
          $scope.searchReturn.push(item);
        }
      });

      //CHECKS IF PINYIN AND DEFINITION SUBSTRINGS EXIST IN EACH ELEMENT OF THE DICTIONARY
      function containsString(a, b){
        var indexArr = [];
        for(var i = 0; i < a.length; i++){
          indexArr.push(b.indexOf(a.charAt(i)));
        }
        for(var ii = 0; ii < indexArr.length - 1; ii++){
          if((indexArr[ii] + 1) !== indexArr[ii + 1]){
            return false;
          }
        }
        return true;
      }
      function containsRadical(radical, character){
        return initRad === radical || initRad === character;
      }
    }

    $scope.radicals = hanziSrv.getRadicals();

  });
