import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import PerusahaanController from "../../controllers/perusahaan.controller";
import { createPerusahaanSchema, deletePerusahaanSchema, getPerusahaanByIdSchema, updatePerusahaanSchema } from "../../dto/perusahaan.dto";
import { authenticateToken } from "../../middleware";

const router = Router();

router.get('/', tryCatchWrapper(PerusahaanController.getAllPerusahaan));
router.get('/:id', validate(getPerusahaanByIdSchema), tryCatchWrapper(PerusahaanController.getPerusahaanById));
router.post('/', authenticateToken, validate(createPerusahaanSchema), tryCatchWrapper(PerusahaanController.createPerusahaan));
router.put('/:id', authenticateToken, validate(updatePerusahaanSchema), tryCatchWrapper(PerusahaanController.updatePerusahaan));
router.delete('/:id', authenticateToken, validate(deletePerusahaanSchema), tryCatchWrapper(PerusahaanController.deletePerusahaan));

export default router;