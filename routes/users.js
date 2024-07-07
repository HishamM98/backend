import express from "express";
import * as user from "../controllers/users.js";
import { verifyJWT } from "../middleware/jwt.js";
var userRouter = express.Router();

/* GET users listing. */
userRouter.post("/signup", user.createUser);
userRouter.post("/login", user.login);
userRouter.get("/all", user.getUsers);
userRouter.get("/", verifyJWT, user.getUser);
userRouter.delete("/:id", verifyJWT, user.deleteUser);

export { userRouter };
