import { Request, Response } from "express";
import { BarangService } from "../services";
import { HttpStatusCode } from "../common/types";
import { JsonResponse } from "../utils";

class BarangController {
    async getAllBarang(req: Request, res: Response) {
        const { q, perusahaan } = req.query;

        const barangList = await BarangService.filterBarang(
            typeof q === 'string' ? q : "", 
            typeof perusahaan === 'string' ? perusahaan : ""
        );

        return (new JsonResponse(res))
                .success()
                .withData(barangList)
                .make();
    }

    async getBarangById(req: Request, res: Response) {
        const { id } = req.params;

        const barang = await BarangService.getBarangById(id);

        const jsonResponse = new JsonResponse(res);

        return jsonResponse
                .success()
                .withData(barang)
                .make();
    }

    async createBarang(req: Request, res: Response) {
        const { nama, harga, stok, perusahaan_id, kode } = req.body;
        const barang = await BarangService.createBarang(nama, harga, stok, perusahaan_id, kode);

        return (new JsonResponse(res))
                .success()
                .withData(barang)
                .make();
    }

    async updateBarang(req: Request, res: Response) {
        const { nama, harga, stok, perusahaan_id, kode } = req.body;
        const { id } = req.params
        const barang = await BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode);

        return (new JsonResponse(res))
                .success()
                .withData(barang)
                .make();
    }

    async deleteBarang(req: Request, res: Response) {
        const { id } = req.params

        const barang = await BarangService.deleteBarang(id);
        
        return (new JsonResponse(res))
                .success()
                .withData(barang)
                .make();
    }

    async decreaseStokBarang(req: Request, res: Response) {
        const { id } = req.params;
        const { decrease_by } = req.body;

        const barang = await BarangService.decreaseStokBarang(id, decrease_by);

        return (new JsonResponse(res))
                .success()
                .withData(barang)
                .make();
    }
}

export default new BarangController();