angular.module("hanziLearner" ["ui.router"])

  .config(function($stateProvider, $urlRouterProvider){

    $urlrouterProvider.otherwise("/");

    .state("home", {
      url: "/",
      templateUrl: "./components/home/inbox.html",
      controller: "homeCtrl"
    })
    .state("profile", {
      url: "/profile/:user",
      templateUrl: "./components/profile/draft.html",
      controller: "profileCtrl"
    })
    .state("quiz", {
      url: "/quiz/:user",
      templateUrl: "./components/quiz/contacts.html",
      controller: "quizCtrl"
    })
    .state("hanzi", {
      url: "/hanzi",
      templateUrl: "./components/hanzi/hanziHtml.html",
      controller: "hanziCtrl"
    })

  });
