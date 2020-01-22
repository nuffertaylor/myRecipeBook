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
    $scope.measurements = ["cup","teaspoon","tablespoon","ounce", "gram", "milligram", "fluid ounce", "pint", "liter", "pound", "other"];
    
    
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
                if ($scope.recipe.img == null)
                {
                    $scope.recipe.img = "/images/pot.png";
                }
                var recipe = new Object();
                recipe = $scope.recipe;
                var ingredArray = $scope.ingredientList;
                $scope.recipe.numIngredients = ingredArray.length;
                $scope.recipe.user = "admin";
                var sendJSON = JSON.stringify(recipe);
                console.log(sendJSON);
                $http({
                    method: 'POST',
                    url: '/newRecipe',
                    headers: { 'Content-Type': 'application/json' },
                    data: sendJSON
                }).then(function successCallback(response) {
                    console.log(response.data);
                    console.log(ingredArray.length)
                    for (var i = 0; i < ingredArray.length; i++)
                    {
                        console.log(i);
                        var ingredToPost = new Object();
                        ingredToPost = ingredArray[i];
                        ingredToPost.recipeRef = response.data;
                        var ingredJSON = JSON.stringify(ingredToPost);
                        console.log(ingredJSON);
                        $http({
                        method: 'POST',
                        url: '/newIngredient',
                        headers: { 'Content-Type': 'application/json' },
                        data: ingredJSON
                        }).then(function successCallback(response) {
                            console.log("successfully posted ingredient #" + i);
                        }, function errorCallback(response) {
                            console.log("failed to post ingredient #" + i);
                        });
                    }
                    
                    //alert("congrats " + recipe.name + " was posted!");
                }, function errorCallback(response) {
                    console.log('didnt work');
                });
                $scope.recipe = angular.copy($scope.master);
                $scope.ingredientList = [];
            }
            else{}
        }
    };
});