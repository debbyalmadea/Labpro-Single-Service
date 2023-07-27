import { Request, Response } from "express";
import { JsonResponse } from "../utils";
import { IPerusahaanController, IPerusahaanService } from "../common/types";

class PerusahaanController implements IPerusahaanController {
    constructor(private perusahaanService: IPerusahaanService) {
        this.getAllPerusahaan = this.getAllPerusahaan.bind(this);
        this.getPerusahaanById = this.getPerusahaanById.bind(this);
        this.createPerusahaan = this.createPerusahaan.bind(this);
        this.updatePerusahaan = this.updatePerusahaan.bind(this);
        this.deletePerusahaan = this.deletePerusahaan.bind(this);
    }

    async getAllPerusahaan(req: Request, res: Response) {
        const { q } = req.query;

        const perusahaanList = await this.perusahaanService.filterPerusahaan(typeof q === 'string' ? q : "");

        return (new JsonResponse(res))
                .success()
                .withData(perusahaanList)
                .make();
    }

    async getPerusahaanById(req: Request, res: Response) {
        const { id } = req.params;

        const perusahaan = await this.perusahaanService.getPerusahaanById(id);

        const jsonResponse = new JsonResponse(res);

        return jsonResponse
                .success()
                .withData(perusahaan)
                .make();
    }

    async createPerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const perusahaan = await this.perusahaanService.createPerusahaan(nama, alamat, no_telp, kode);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }

    async updatePerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const { id } = req.params
        const perusahaan = await this.perusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }

    async deletePerusahaan(req: Request, res: Response) {
        const { id } = req.params

        const perusahaan = await this.perusahaanService.deletePerusahaan(id);

        return (new JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
    }
}

export default PerusahaanController;