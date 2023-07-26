import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { UserController } from "../../controllers";
import { tryCatchWrapper } from "../../utils";
import { UserService } from "../../services";
import { User } from "../../models";

const userService = new UserService(User);
const userController = new UserController(userService);

const router = Router();

router.get('/', authenticateToken, tryCatchWrapper(userController.getSelfDetail));

export default router;