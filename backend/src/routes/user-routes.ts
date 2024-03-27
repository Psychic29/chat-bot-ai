import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
  userVerify,
  userLogout
} from "../controllers/user-controllers";
import { loginValidator, signupValidator, validate } from "../utils/validators";
import { verifyToken } from "../utils/token-manager";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, userVerify);
userRoutes.post("/logout", verifyToken, userLogout);

export default userRoutes;
