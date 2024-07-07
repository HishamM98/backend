import { pool } from "../database.js";
import { User } from "../models/user.js";

export class Recipe {
  constructor(
    id,
    title,
    user_id,
    image,
    description,
    vegitarian,
    createdAt,
    likes
  ) {
    this.id = id;
    this.title = title;
    this.user_id = user_id;
    this.image = image;
    this.description = description;
    this.vegitarian = vegitarian;
    this.createdAt = createdAt;
    this.likes = likes;
  }

  static async createRecipe(title, image, description, vegitarian, user_id) {
    const sql = `INSERT INTO recipe(title, image, description, vegitarian, user_id) VALUES (?, ?, ?, ?, ?)`;
    const [results] = await pool.query(sql, [
      title,
      image,
      description,
      vegitarian,
      user_id,
    ]);
    return new Recipe(
      results.insertId,
      title,
      user_id,
      image,
      description,
      vegitarian,
      new Date(Date.now()),
      []
    );
  }

  static async getRecipeById(id) {
    const sql = `SELECT * FROM recipe WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0]
      ? new Recipe(
          rows[0].id,
          rows[0].title,
          rows[0].user_id,
          rows[0].image,
          rows[0].description,
          rows[0].vegitarian,
          rows[0].createdAt,
          rows[0].likes
        )
      : null;
  }

  static async getAllRecipes() {
    const sql = `SELECT * FROM recipe`;
    const [rows] = await pool.query(sql);
    return rows.map(
      (el) =>
        new Recipe(
          el.id,
          el.title,
          el.user_id,
          el.image,
          el.description,
          el.vegitarian,
          el.createdAt,
          el.likes
        )
    );
  }

  static async getRecipeAuthor(recipeId) {
    const sql = `SELECT user.fullname, user.avatar FROM recipe JOIN user ON recipe.user_id = user.id WHERE recipe.id = ?`;
    const [rows] = await pool.query(sql, [recipeId]);
    return rows[0];
  }

  static async deleteRecipe(id) {
    const sql = `delete FROM recipe WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  }

  static async updateRecipe(recipe, id) {
    // let oldRecipe = this.getRecipeById(id);
    const sql = `UPDATE recipe SET ${Object.keys(recipe)
      .map((key) => `${key} = ?`)
      .join(",")} WHERE id = ?`;
    const [result] = await pool.query(sql, [...Object.values(recipe), id]);
    return result;
  }

  static async likeRecipe(recipe_id, user_id) {
    let recipe = await this.getRecipeById(recipe_id);
    if (!recipe) return null;
    let likesArray = recipe.likes;
    if (!likesArray) {
      likesArray = user_id;
    } else {
      let likes = likesArray.split(", ");
      if (likes.includes(user_id + "")) {
        likes.splice(likes.indexOf(user_id), 1);
      } else {
        likes.push(user_id);
      }
      likesArray = likes.join(", ");
    }

    const sql = `UPDATE recipe SET likes = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [likesArray || null, recipe_id]);
    return result;
  }
}
