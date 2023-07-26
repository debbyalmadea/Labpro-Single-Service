import { Router } from "express";
import { tryCatchWrapper, validate } from "../../utils";
import { authenticateToken } from "../../middleware";
import { createBarangSchema, deleteBarangSchema, getBarangByIdSchema, updateBarangSchema, decreaseStokBarangSchema } from "../../dto/barang.dto";
import { BarangController } from "../../controllers";
import { BarangService, PerusahaanService } from "../../services";
import { Barang, Perusahaan } from "../../models";

const perusahaanService = new PerusahaanService(Perusahaan);
const barangService = new BarangService(Barang, perusahaanService);
const barangController = new BarangController(barangService);

const router = Router();

router.get('/', tryCatchWrapper(barangController.getAllBarang));
router.post('/', authenticateToken, validate(createBarangSchema), tryCatchWrapper(barangController.createBarang));
router.get('/:id', validate(getBarangByIdSchema), tryCatchWrapper(barangController.getBarangById));
router.put('/:id', authenticateToken, validate(updateBarangSchema), tryCatchWrapper(barangController.updateBarang));
router.delete('/:id', authenticateToken, validate(deleteBarangSchema), tryCatchWrapper(barangController.deleteBarang));
router.patch('/:id/stok/decrease', validate(decreaseStokBarangSchema), tryCatchWrapper(barangController.decreaseStokBarang));

export default router;