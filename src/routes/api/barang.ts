import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import { authenticateToken } from "../../middleware";
import { createBarangSchema, deleteBarangSchema, getBarangByIdSchema, updateBarangSchema, decreaseStokBarangSchema } from "../../dto/barang.dto";
import { BarangController } from "../../controllers";

const router = Router();

router.get('/', tryCatchWrapper(BarangController.getAllBarang));
router.post('/', authenticateToken, validate(createBarangSchema), tryCatchWrapper(BarangController.createBarang));
router.get('/:id', validate(getBarangByIdSchema), tryCatchWrapper(BarangController.getBarangById));
router.put('/:id', authenticateToken, validate(updateBarangSchema), tryCatchWrapper(BarangController.updateBarang));
router.delete('/:id', authenticateToken, validate(deleteBarangSchema), tryCatchWrapper(BarangController.deleteBarang));
router.patch('/:id/stok/decrease', validate(decreaseStokBarangSchema), tryCatchWrapper(BarangController.decreaseStokBarang));

export default router;