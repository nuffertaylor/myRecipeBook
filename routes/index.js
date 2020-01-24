var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipeDB', { useNewUrlParser: true });
var recipeSchema = mongoose.Schema({
    name: String,
    instructions: String,
    img: String,
    numIngredients: Number,
    user: String
});

var ingredientSchema = mongoose.Schema({
  size: Number, 
  type: String, 
  unit: String,
  recipeRef: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);
var Ingredient = mongoose.model('Ingredient', ingredientSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/allRecipes', function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/allRecipes.html'));
});

router.get('/addRecipe', function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/addRecipe.html'));
});

router.get('/recipe/:_id', function(req,res) {
  res.sendFile(path.join(__dirname + '/../public/recipeDetails.html'));
});

router.get('/ranRecipe/:_id', function(req,res) {
  res.sendFile(path.join(__dirname + '/../public/ranRecipeDetails.html'));
});

router.post('/newRecipe', function(req, res, next) {
  console.log("posting a new recipe");
  Recipe.find({},
    function(err, recipeList) {
      if (err) { console.log("error"); }
      else {
        var recipeJSON = 
        {
          name: req.body.name,
          instructions: req.body.instructions,
          img: req.body.img,
          numIngredients: req.body.numIngredients,
          user: req.body.user
        };
        var newRecipe = new Recipe(recipeJSON);
        newRecipe.save(function(err, post) {
          if (err) return console.error(err);
          console.log();
          //res.json("success");
          res.json(post._id);
          //res.json("{\"recipeRef\":post._id");
        });
      }
    });
});

router.post('/newIngredient', function(req,res) {
  console.log("posting an ingredient");
  Ingredient.find({},
    function(err, ingredientList) {
      if(err) {console.log("error"); }
      else {
        var ingredientJSON =
        {
          size: req.body.size,
          type: req.body.type,
          unit: req.body.unit,
          recipeRef: req.body.recipeRef
        };
        var newIngredient = new Ingredient(ingredientJSON);
        newIngredient.save(function(err,post) {
          if(err) return console.error(err);
          console.log(post);
          res.json("success");
        });
      }
    });
});


router.get('/recipeList', function(req, res) {
  Recipe.find({}, function(err, recipeList) {
    if (err) { console.log("an error has occured"); }
    res.json(recipeList);
  });
});

router.get('/pullRecipe/:_id', function(req, res) {
  Recipe.find({_id: req.params._id}, function(err, recipe) {
    if(err) {console.log("ERROR");}
    res.json(recipe);
  });
});

router.get('/pullIngredients/:ref', function(req, res) {
  Ingredient.find({recipeRef : req.params.ref}, function (err, ingredientList) {
    if (err) return console.error(err); 
    else {res.json(ingredientList);}
  });
});

router.get('/randomRecipe', function(req,res) {
  Recipe.find({}, function(err, recipeList) {
    if (err) { console.log("an error has occured"); }
    var idRef = recipeList[(Math.floor(Math.random() * recipeList.length))]._id;
    res.redirect("/ranRecipe/" + idRef);
  });
});

router.get('/allIngredients', function(req, res) {
  Ingredient.find({}, function (err, ingredientList) {
    if (err) return console.error(err); 
    else
    {
      res.json(ingredientList);      
    }
  });
});

module.exports = router;
