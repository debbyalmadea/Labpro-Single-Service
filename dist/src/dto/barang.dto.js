"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreaseStokBarangSchema = exports.deleteBarangSchema = exports.updateBarangSchema = exports.createBarangSchema = exports.getBarangByIdSchema = void 0;
const zod_1 = require("zod");
const getBarangByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    })
});
exports.getBarangByIdSchema = getBarangByIdSchema;
const createBarangSchema = zod_1.z.object({
    body: zod_1.z.object({
        nama: zod_1.z.string({
            required_error: "Nama is required",
        }),
        harga: zod_1.z.number({
            required_error: "Harga is required"
        }).int({ message: "Harga must be integer" }).min(0, { message: "Harga can't be negative" }),
        stok: zod_1.z.number({
            required_error: "Stok is required"
        }).int({ message: "Stok must be integer" }).min(0, { message: "Stok can't be negative" }),
        perusahaan_id: zod_1.z.string({
            required_error: "Perusahaan Id is required",
        }),
        kode: zod_1.z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, { message: "Kode must be 3 uppercase letter" })
    })
});
exports.createBarangSchema = createBarangSchema;
const updateBarangSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: zod_1.z.object({
        nama: zod_1.z.string({
            required_error: "Nama is required",
        }),
        harga: zod_1.z.number({
            required_error: "Harga is required"
        }).int({ message: "Harga must be integer" }).min(0, { message: "Harga can't be negative" }),
        stok: zod_1.z.number({
            required_error: "Stok is required"
        }).int({ message: "Stok must be integer" }).min(0, { message: "Stok can't be negative" }),
        perusahaan_id: zod_1.z.string({
            required_error: "Perusahaan Id is required",
        }),
        kode: zod_1.z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, { message: "Kode must be 3 uppercase letter" })
    })
});
exports.updateBarangSchema = updateBarangSchema;
const deleteBarangSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    })
});
exports.deleteBarangSchema = deleteBarangSchema;
const decreaseStokBarangSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: zod_1.z.object({
        decrease_by: zod_1.z.number({
            required_error: "Decrease by is required"
        }).int({ message: "Decrease by must be integer" }).min(0, { message: "Decrease by can't be negative" }),
    })
});
exports.decreaseStokBarangSchema = decreaseStokBarangSchema;
