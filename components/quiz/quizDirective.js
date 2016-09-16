angular.module("hanziLearner")
  .directive("quizDirective", function(){
    return{
      restrict: "E",
      templateUrl: "./components/quiz/quizDir.html",
      scope:{
        question: "="
      },
      link: function(scope, element, attrs){

      }
    }
  });
