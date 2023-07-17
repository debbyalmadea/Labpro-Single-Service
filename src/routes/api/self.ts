import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { UserController } from "../../controllers";
import { tryCatchWrapper } from "../../utils";

const router = Router();

router.get('/', authenticateToken, tryCatchWrapper(UserController.getSelfDetail));

export default router;