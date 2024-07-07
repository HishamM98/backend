import bcrypt from "bcrypt";
import { pool } from "../database.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export class User {
  constructor(id, fullname, email, password) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }

  static async createUser(fullname, email, password) {
    const hashedPassword = await this.hashPassword(password);
    const sql = `INSERT INTO user(fullname, email, password) VALUES (?, ?, ?)`;
    const [results] = await pool.query(sql, [fullname, email, hashedPassword]);
    return new User(results.insertId, fullname, email, hashedPassword);
  }

  static async getUserById(id) {
    const sql = `SELECT * FROM user WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0]
      ? new User(rows[0].id, rows[0].fullname, rows[0].email, rows[0].password)
      : null;
  }

  static async getUserByEmail(email) {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const [rows] = await pool.query(sql, [email]);
    return rows[0]
      ? new User(rows[0].id, rows[0].fullname, rows[0].email, rows[0].password)
      : null;
  }

  static async getAllUsers() {
    const sql = `SELECT * FROM user`;
    const [rows] = await pool.query(sql);
    return rows.map(
      (el) => new User(el.id, el.fullname, el.email, el.password)
    );
  }

  static async deleteUser(id) {
    const sql = `delete FROM user WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  }

  static async login(email, password) {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const [result] = await pool.query(sql, [email]);
    if (
      result.length > 0 &&
      (await bcrypt.compare(password, result[0].password))
    ) {
      // User is authenticated, create a JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    } else {
      return null;
    }
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
