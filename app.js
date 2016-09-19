angular.module("hanziLearner", ["ui.router"])

  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "./components/home/homeHtml.html",
        controller: "homeCtrl"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "./components/profile/profileHtml.html",
        controller: "profileCtrl"
      })
      .state("quiz", {
        url: "/quiz/",
        templateUrl: "./components/quiz/quizHtml.html",
        controller: "quizCtrl",
        params: {revQuiz: null}
      })
      .state("hanzi", {
        url: "/hanzi",
        templateUrl: "./components/hanzi/hanziHtml.html",
        controller: "hanziCtrl"
      });

  });
