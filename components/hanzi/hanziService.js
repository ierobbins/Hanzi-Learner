angular.module("hanziLearner")
  .service("hanziSrv", function($http, mainSrv){

    var baseUrl = "http://api.voicerss.org/?key=695906d52c8d4c228667de0213150caa&hl=zh-cn&src="

    this.characters = mainSrv.getCharacters();

    this.getRadicals = function(){
      var rads = [];
      for(var i = 0; i < this.characters.length; i++){
        if(rads.indexOf(this.characters[i].radical) === -1){
          rads.push(this.characters[i].radical);
        }
      }
      return rads;
    }

    this.getCharSound = function(initChar){
      var promise = $http.get(baseUrl + initChar)
        .then(function(response){
          var charSound = new Audio(response.config.url);
          return charSound;
        });
      return promise;
    }




  });
