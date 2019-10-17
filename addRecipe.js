var app = angular.module("addRecipe", []);
app.controller("recipeCtrl", function($scope, $http) {
    
    $scope.ingredientList = [];
    /* ingredient object format
    ingredient.size
    ingredient.unit
    ingredient.type*/
    //https://en.wikibooks.org/wiki/Cookbook:Units_of_measurement
    $scope.measurements = ["cup","teaspoon","tablespoon","ounce", "gram", "milligram", "fluid ounce", "pint", "liter", "pound"];
    
    $scope.addIngredient = function()
    {
        var ingredient = new Object();
        ingredient = $scope.ingredient;
        console.log(ingredient);
        $scope.ingredientList.push(ingredient);
        $scope.ingredient = {};
    }
    
    $scope.removeIngredient = function(x)
    {
        for (var i=0; i < $scope.ingredientList.length; i++)
        {
            if (x.size == $scope.ingredientList[i].size)
            {
                if (x.unit == $scope.ingredientList[i].unit)
                {
                    if(x.type == $scope.ingredientList[i].type)
                    {
                        $scope.ingredientList.splice(i,1);
                    }
                }
            }
        }
    }
    
});