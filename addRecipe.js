var app = angular.module("addRecipe", []);
app.controller("recipeCtrl", function($scope, $http) {
    
    $scope.ingredientList = [];
    $scope.recipe = new Object();
    $scope.ingredient = new Object();
    /* ingredient object format
    ingredient.size
    ingredient.unit
    ingredient.type*/
    //https://en.wikibooks.org/wiki/Cookbook:Units_of_measurement
    $scope.measurements = ["cup","teaspoon","tablespoon","ounce", "gram", "milligram", "fluid ounce", "pint", "liter", "pound"];
    
    
    $scope.heyMan = function()
    {
      alert("hey man!");  
    };
    
    
    $scope.addIngredient = function()
    {
        if ($scope.ingredient.size == null)
        {
            alert("how much do we need of that ingredient?");
        }
        else if($scope.ingredient.unit == null)
        {
            alert("you need units to add the ingredient!");
        }
        else if($scope.ingredient.type == null)
        {
            alert("what are we adding?");
        }
        else
        {
            var ingredient = new Object();
            ingredient = $scope.ingredient;
            console.log(ingredient);
            $scope.ingredientList.push(ingredient);
            $scope.ingredient = angular.copy($scope.master);
        }
    };
    
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
    };
    
    $scope.submitRecipe = function()
    {
        if ($scope.recipe.name == null)
        {
            alert("what is the name of this recipe?");
        }
        else if ($scope.ingredientList.length < 1)
        {
            alert("you need to add ingredients still!");
        }
        
        else if ($scope.recipe.instructions == null)
        {
            alert("you need instructions still!");
        }
        else
        {
            if (confirm("are you sure you want to submit " + $scope.recipe.name + "?"))
            {
                $scope.recipe.ingredients = $scope.ingredientList;
                var recipe = new Object();
                recipe = $scope.recipe;
                var sendJSON = JSON.stringify(recipe);
                console.log(sendJSON);
                $scope.recipe = angular.copy($scope.master);
                $scope.ingredientList = [];
            }
            else{}
        }
    };
    
});