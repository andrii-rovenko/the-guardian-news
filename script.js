(function(){
    var app = angular.module("MainModule", []);

    const MainController = function($scope, $http){

        $scope.click = function(){
            console.log("button is pressed");

            refresh($scope.currentPage);
        }

        $scope.submit = function(value){
            console.log("submitted " + value);
            refresh(value);
        }

        $scope.nextPage = function(){
            if ($scope.currentPage < $scope.pagesCount){
                $scope.currentPage++;
                refresh($scope.currentPage);
            }
        }

        $scope.previousPage = function(){
            if ($scope.currentPage > 1){
                $scope.currentPage--;
                refresh($scope.currentPage);
            }
        }

        const refresh = function(page){
            console.log();
            const searchLink = "http://content.guardianapis.com/search?";
            //let pageNumber = 1;
            const apiKey = "api-key=test";
            let link;

            const createLink = function(page){
                link = searchLink  + "page=" + page + "&" + apiKey;
            }
            
            if ($scope.currentPage){
                createLink($scope.currentPage)
            } else {
                createLink(page);
            }
            $http.get(link)
                .then(onResponse, onError);
        }

        const onResponse = function(respond){
            $scope.news = respond.data.response.results.map(el => {
               $http.get(el.apiUrl + "?show-blocks=body&api-key=test")
                .then(respond => {
                    el.fullArticle = respond.data.response.content.blocks.body[0].bodyTextSummary;
                }, respond => {
                    el.error = "error";
                }); 
                return el;
            });
            delete $scope.error;
            $scope.pagesCount = respond.data.response.pages;
            $scope.currentPage = respond.data.response.currentPage;
        }

        const onError = function(respond){
            $scope.error = "Could not fetch the data";
            delete $scope.news;
            console.log($scope.error);
        }

        $scope.show = function(id){
            $scope.news = $scope.news.map(el => {
                if (el.id === id) {
                        el.display = !el.display;
                } else {
                    el.display = false;
                }
                return el;
            });
            console.log($scope.news);
        }

        refresh(1);

    }

    app.controller("MainController", MainController);

}());