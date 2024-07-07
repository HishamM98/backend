import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";

export async function createRecipe(req, res) {
  try {
    const user = await User.getUserByEmail(req.email);
    const { title, image, description, vegitarian } = req.body;
    const recipe = await Recipe.createRecipe(
      title,
      image,
      description,
      vegitarian,
      user.id
    );
    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.sqlMessage });
  }
}

export async function getRecipe(req, res) {
  try {
    const id = req.params.id;
    const recipe = await Recipe.getRecipeById(id);
    if (recipe) {
      res
        .status(201)
        .setHeader("Cache-Control", "public, max-age=300")
        .json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code });
  }
}

export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.getAllRecipes();
    if (recipes) {
      res
        .status(201)
        .setHeader("Cache-Control", "public, max-age=300")
        .json(recipes);
    } else {
      res.status(404).json({ message: "No recipes found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code });
  }
}

export async function getRecipeAuthor(req, res) {
  try {
    const recipeId = req.params.id;
    const recipeAuthor = await Recipe.getRecipeAuthor(recipeId);
    if (recipeAuthor) {
      res
        .status(201)
        .setHeader("Cache-Control", "public, max-age=300")
        .json(recipeAuthor);
    } else {
      res.status(404).json({ message: "Invalid Query!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code });
  }
}

export async function deleteRecipe(req, res) {
  try {
    const id = req.params.id;
    const recipe = await Recipe.deleteRecipe(id);
    if (recipe.affectedRows == 1) {
      res.status(201).json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ message: "No such recipe!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code });
  }
}

export async function updateRecipe(req, res) {
  try {
    const id = req.params.id;
    const newValues = req.body;
    const recipe = await Recipe.updateRecipe(newValues, id);
    if (recipe.affectedRows == 1) {
      res.status(201).json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "No such recipe!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code });
  }
}

export async function likeRecipe(req, res) {
  try {
    const user = await User.getUserByEmail(req.email);
    const recipe_id = req.params.id;
    const recipe = await Recipe.likeRecipe(recipe_id, user.id);
    if (recipe && recipe.affectedRows == 1) {
      res.status(201).json({ message: "Recipe like updated!" });
    } else {
      res.status(404).json({ message: "No such recipe!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.sqlMessage || error.code || error });
  }
}
