import express from "express";
import { verifyJWT } from "../middleware/jwt.js";
import * as recipe from "../controllers/recipes.js";
var recipeRouter = express.Router();

/* GET recipes listing. */
recipeRouter.post("/", verifyJWT, recipe.createRecipe);
recipeRouter.patch("/:id", verifyJWT, recipe.updateRecipe);
recipeRouter.get("/like/:id", verifyJWT, recipe.likeRecipe);
recipeRouter.get("/", recipe.getRecipes);
recipeRouter.get("/:id", recipe.getRecipe);
recipeRouter.get("/:id/author", recipe.getRecipeAuthor);
recipeRouter.delete("/:id", verifyJWT, recipe.deleteRecipe);

export { recipeRouter };
