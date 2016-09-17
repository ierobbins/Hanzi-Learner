angular.module("hanziLearner")
  .service("hanziSrv", function(mainSrv){

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




  });
