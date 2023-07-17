import { Router } from "express";
import login from './api/login';
import self from './api/self';
import perusahaan from './api/perusahaan'
import barang from './api/barang'

const router = Router();

router.use('/login', login);
router.use('/self', self);
router.use('/perusahaan', perusahaan);
router.use('/barang', barang);

export default router;