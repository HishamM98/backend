import { User } from "../models/user.js";

export async function createUser(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.createUser(fullname, email, password);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.sqlMessage);
  }
}

export async function getUser(req, res) {
  try {
    const email = req.email;
    const user = await User.getUserByEmail(email);
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(500).send(error.sqlMessage || error.code);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    if (users) {
      res.status(201).send(users);
    } else {
      res.status(404).send("No users found!");
    }
  } catch (error) {
    res.status(500).send(error.sqlMessage || error.code);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.deleteUser(id);
    if (user.affectedRows == 1) {
      res.status(201).send("User deleted successfully");
    } else {
      res.status(404).send("No such user!");
    }
  } catch (error) {
    res.status(500).send(error.sqlMessage || error.code);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userToken = await User.login(email, password);
    if (userToken) {
      res.status(201).json({ userToken });
      // res
      //   .status(201)
      //   .cookie("jwtToken", userToken, {
      //     maxAge: 3600000,
      //   })
      //   .send("Login Successful"); // Expires in 1 hour
    } else {
      res.status(401).send("Invalid email or password!");
    }
  } catch (error) {
    res.status(500).send(error.sqlMessage || error.code);
  }
}
