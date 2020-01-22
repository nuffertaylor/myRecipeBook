var app = angular.module("recipeSelect", []);
app.controller("recipeCtrl", function($scope, $http) {
    
    $scope.refreshList = function() {
        $http({
            method: 'GET',
            url: '/recipeList'
        }).then(function successCallback(response) {
            var tempArr = response.data;
            $scope.recipeList = tempArr;
            $scope.recipeList.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
            });
            console.log($scope.recipeList);
        }, function errorCallback(response) {
            console.log("couldn't find recipes :(");
        });
    };
    
    $scope.recipeList = [];
    $scope.refreshList();
    
    
});