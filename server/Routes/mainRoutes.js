import express from "express";
import { register, login, user } from "../controllers/mainControllers.js";

const mainRouter = express.Router();

mainRouter.post("/login", login);

mainRouter.post("/register", register);

mainRouter.get("/user", user);

export default mainRouter;
