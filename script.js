(function(){

    var app = angular.module("MainModule", []);

    const MainController = function($scope, $http){

        const onResponse = function(respond){
            $scope.news = respond.data.response.results;
            //console.log($scope.news);
        }

        const onError = function(respond){
            $scope.error = "Could not fetch the data";
            console.log($scope.error);
        }

        const refresh = function(){
            $http.get("http://content.guardianapis.com/search?api-key=test")
                .then(onResponse, onError);
        }

        $scope.click = function(){
            console.log("button is pressed");
            refresh();
        }

        refresh();

    }

    app.controller("MainController", MainController);

}());