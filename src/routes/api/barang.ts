import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import { authenticateToken } from "../../middleware";
import { createBarangSchema, deleteBarangSchema, getBarangByIdSchema, updateBarangSchema, updateStokBarangSchema } from "../../dto/barang.dto";
import { BarangController } from "../../controllers";

const router = Router();

router.get('/', tryCatchWrapper(BarangController.getAllBarang));
router.get('/:id', validate(getBarangByIdSchema), tryCatchWrapper(BarangController.getBarangById));
router.post('/', authenticateToken, validate(createBarangSchema), tryCatchWrapper(BarangController.createBarang));
router.put('/:id', authenticateToken, validate(updateBarangSchema), tryCatchWrapper(BarangController.updateBarang));
router.put('/stok/:id', validate(updateStokBarangSchema), tryCatchWrapper(BarangController.updateStokBarang));
router.delete('/:id', authenticateToken, validate(deleteBarangSchema), tryCatchWrapper(BarangController.deleteBarang));

export default router;