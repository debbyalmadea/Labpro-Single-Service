import { Request, Response } from "express";
import { PerusahaanService } from "../services";
import { HttpStatusCode } from "../common/types";
import { JsonResponse } from "../utils";

class PerusahaanController {
    async getAllPerusahaan(req: Request, res: Response) {
        const { q } = req.query;

        const perusahaanList = await PerusahaanService.filterPerusahaan(typeof q === 'string' ? q : "");

        return (new JsonResponse(res))
                .success()
                .withData(perusahaanList)
                .make();
    }

    async getPerusahaanById(req: Request, res: Response) {
        const { id } = req.params;

        const perusahaan = await PerusahaanService.getPerusahaanById(id);

        const jsonResponse = new JsonResponse(res);

        return jsonResponse
                .success()
                .withData(perusahaan)
                .make();
    }

    async createPerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const perusahaan = await PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }

    async updatePerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const { id } = req.params
        const perusahaan = await PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }

    async deletePerusahaan(req: Request, res: Response) {
        const { id } = req.params

        const perusahaan = await PerusahaanService.deletePerusahaan(id);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }
}

export default new PerusahaanController();