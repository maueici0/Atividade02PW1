import { Router } from "express";
import { UserController } from "../controller/userController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create);

export default userRoutes;