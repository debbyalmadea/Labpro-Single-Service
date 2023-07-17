import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import { AuthController } from "../../controllers";
import { logInSchema } from "../../dto/auth.dto";

const router = Router();

router.post('/', validate(logInSchema), tryCatchWrapper(AuthController.logIn));

export default router;