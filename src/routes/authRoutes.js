import { Router } from "express";
import { registerUserSchema, loginUserSchema } from "../validations/usersValidation.js";
import { registerUser, loginUser, logoutUser, refreshUserSession } from "../controllers/authController.js";
import { celebrate } from "celebrate";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/logout", logoutUser);
router.post("/auth/refresh", refreshUserSession);


export default router;
