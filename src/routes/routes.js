import { Router } from "express";
import financial from "./financial/financial.js";
import users from "./users/users.js";

const routes = Router();
routes.use(users);
routes.use(financial);

export default routes;