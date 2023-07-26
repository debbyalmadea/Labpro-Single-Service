import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import PerusahaanController from "../../controllers/perusahaan.controller";
import { createPerusahaanSchema, deletePerusahaanSchema, getPerusahaanByIdSchema, updatePerusahaanSchema } from "../../dto/perusahaan.dto";
import { authenticateToken } from "../../middleware";
import { PerusahaanService } from "../../services";
import { Perusahaan } from "../../models";

const perusahaanService = new PerusahaanService(Perusahaan);
const perusahaanController = new PerusahaanController(perusahaanService);

const router = Router();

router.get('/', tryCatchWrapper(perusahaanController.getAllPerusahaan));
router.get('/:id', validate(getPerusahaanByIdSchema), tryCatchWrapper(perusahaanController.getPerusahaanById));
router.post('/', authenticateToken, validate(createPerusahaanSchema), tryCatchWrapper(perusahaanController.createPerusahaan));
router.put('/:id', authenticateToken, validate(updatePerusahaanSchema), tryCatchWrapper(perusahaanController.updatePerusahaan));
router.delete('/:id', authenticateToken, validate(deletePerusahaanSchema), tryCatchWrapper(perusahaanController.deletePerusahaan));

export default router;