import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import { AuthController } from "../../controllers";
import { logInSchema } from "../../dto/auth.dto";
import { AuthService, UserService } from "../../services";
import { User } from "../../models";

const userService = new UserService(User);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

const router = Router();

router.post('/', validate(logInSchema), tryCatchWrapper(authController.logIn));

export default router;