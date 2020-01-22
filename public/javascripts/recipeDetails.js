var app = angular.module("recipeDetails", []);
app.controller("recipeCtrl", function($scope, $http, $location) {
    
    var url = $location.absUrl();
    var id = url.split("/");
    $scope.id = id[id.length-1];
    
    $scope.getRecipeInfo = function()
    {
        $scope.getTitle();
        $scope.ingredientList = $scope.getIngredients();
    };
    $scope.getTitle = function()
    {
        $http({
            method: 'GET',
            url: '/pullRecipe/' + $scope.id
        }).then(function successCallback(response)
        {
            $scope.recipeInfo = response.data[0];
        });
    };
    $scope.getIngredients = function()
    {
        $http({
            method: 'GET',
            url: '/pullIngredients/' + $scope.id
        }).then(function successCallback(response)
        {
            $scope.ingredientList = response.data;
        });
    };
    
    $scope.getRecipeInfo();
    
});