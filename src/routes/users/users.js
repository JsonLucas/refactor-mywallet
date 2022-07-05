import { Router } from "express";
import signInController from "../../controllers/signInController.js";
import signUpController from "../../controllers/signUpController.js";

const users = Router();
users.post("/sign-up", signUpController);
users.post("/sign-in", signInController);

export default users;