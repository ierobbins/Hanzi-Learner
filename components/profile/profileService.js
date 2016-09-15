angular.module("hanziLearner")
  .service("profileSrv", function(){


    var users = [
      {
        userName: "GinPickle",
        email: "iedwardrobbins@gmail.com",
        password: "hunter2",
        mastered: [],
        learning: []
      }
    ];

    this.listUsers = function(){
      return users;
    }

    this.logIn = function(initUserID, initPass){
      var logInUser = {};
      if(checkUserName(initUserID !== null)){
        logInUser = checkUserName(initUserID);
      } else if (checkEmail(initUserID !== null)) {
        logInUser = checkEmail(initUserID);
      } else {
        return null;
      }
      return (logInUser.password === initPass) ? logInUser : null;
    }

    this.checkEmail = function(initEmail){
      users.forEach(function(item){
        return (initEmail === item.email) ? item : false;
      });
    }

    this.checkUserName = function(initUserName){
      users.forEach(function(item){
        return (initUserName === item.userName) ? item : false;
      });
    }

    this.newUser = function(initUserName, initEmail, initPass){
      users.push({
        userName: initUserName,
        email: initEmail,
        password: initPass,
        mastered: [],
        learned: []
      });
    }

  });
