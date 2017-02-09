(function(){
    var app = angular.module("MainModule", []);

    const MainController = function($scope, $http){

        $scope.click = function(){
            console.log("button is pressed");
            refresh();
        }

        const refresh = function(){
            $http.get("http://content.guardianapis.com/search?api-key=test")
                .then(onResponse, onError);
        }

        const onResponse = function(respond){
            $scope.news = respond.data.response.results;
            $scope.news = $scope.news.map(el => {
               $http.get(el.apiUrl + "?show-blocks=body&api-key=test")
                .then(respond => {
                    el.fullArticle = respond.data.response.content.blocks.body[0].bodyTextSummary;
                }, respond => {
                    el.error = "error";
                }); 
                return el;
            });
            delete $scope.error;
            //console.log($scope.news[0]);
        }

        const onError = function(respond){
            $scope.error = "Could not fetch the data";
            delete $scope.news;
            console.log($scope.error);
        }

        $scope.show = function(id){
            $scope.news = $scope.news.map(el => {
                if (el.id === id) {
                    el.display = true;
                    //console.log(el);
                } else {
                    el.display = false;
                }
                //console.log(el);
                return el;
            });
            console.log($scope.news);
        }

        refresh();

    }

    app.controller("MainController", MainController);

}());