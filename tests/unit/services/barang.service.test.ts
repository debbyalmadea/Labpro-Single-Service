import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpStatusCode } from "../../../src/common/types";
import { Barang } from "../../../src/models";
import { BarangService, PerusahaanService } from "../../../src/services";
import { HttpError } from "../../../src/utils";

const mockedGetPerusahaanById = jest.spyOn(PerusahaanService, 'getPerusahaanById');

jest.mock("../../../src/models");
const mockedBarangFindMany = Barang.findMany as jest.MockedFunction<typeof Barang.findMany>;
const mockedBarangFindFirst = Barang.findFirst as jest.MockedFunction<typeof Barang.findFirst>;
const mockedBarangCreate = Barang.create as jest.MockedFunction<typeof Barang.create>;
const mockedBarangUpdate = Barang.update as jest.MockedFunction<typeof Barang.update>;
const mockedBarangDelete = Barang.delete as jest.MockedFunction<typeof Barang.delete>;

const mockBarangList = [
    {
        "id": "clk77y21e000eof62kwb4bdhl",
        "nama": "Elegant Concrete Ball",
        "harga": 60000,
        "stok": 53,
        "perusahaan_id": "clk77y1zx0002of620j3kbe6x",
        "kode": "SRQ",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk77y2060006of623myltjre",
        "nama": "Handmade Steel Pant",
        "harga": 8100724,
        "stok": 55,
        "perusahaan_id": "clk77y1z70000of62buawhzku",
        "kode": "OSF",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk77y216000aof62vfi2wdt8",
        "nama": "Incredible Granite Fish",
        "harga": 9615738,
        "stok": 13,
        "perusahaan_id": "clk77y1zt0001of62mbhuhohv",
        "kode": "ADH",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk77y2090008of622dfdp0xh",
        "nama": "Modern Cotton Keyboard",
        "harga": 468675,
        "stok": 16,
        "perusahaan_id": "clk77y1zx0002of620j3kbe6x",
        "kode": "AGT",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk77y217000cof62bfo3xc1v",
        "nama": "Modern Plastic Keyboard",
        "harga": 8122344,
        "stok": 78,
        "perusahaan_id": "clk77y1zt0001of62mbhuhohv",
        "kode": "MAS",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk77y2060005of62qq4hi9ua",
        "nama": "Rustic Cotton",
        "harga": 3312891,
        "stok": 24,
        "perusahaan_id": "clk77y1z70000of62buawhzku",
        "kode": "ICC",
        created_at: new Date(),
        updated_at: new Date(),
    }
];

describe('Barang Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('getAllBarang', () => {
    it('should return all barang with selected attributes ordered by name in ascending order', async () => {
        mockedBarangFindMany.mockResolvedValue(mockBarangList);
        
        const result = await BarangService.getAllBarang();
    
        expect(mockedBarangFindMany).toHaveBeenCalledWith({
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
        
        expect(result).toEqual(mockBarangList);
      });
  });

  describe('filterBarang', () => {
    it('should return all barang with selected attributes ordered by name in ascending order when provided with undefined query and company', async () => {
        mockedBarangFindMany.mockResolvedValue(mockBarangList);
        
        const result = await BarangService.filterBarang();
    
        expect(mockedBarangFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: "",
                            mode: 'insensitive'
                        }
                    }
                ],
                perusahaan_id: {
                    contains: "",
                }
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
        
        expect(result).toEqual(mockBarangList);
      });

    it('should return filtered barang by name with selected attributes ordered by name in ascending order when provided with name query', async () => {
        const query = 'modern';
        const _mockBarangList = [
            {
                "id": "clk77y2090008of622dfdp0xh",
                "nama": "Modern Cotton Keyboard",
                "harga": 468675,
                "stok": 16,
                "perusahaan_id": "clk77y1zx0002of620j3kbe6x",
                "kode": "AGT",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                "id": "clk77y217000cof62bfo3xc1v",
                "nama": "Modern Plastic Keyboard",
                "harga": 8122344,
                "stok": 75,
                "perusahaan_id": "clk77y1zt0001of62mbhuhohv",
                "kode": "MAS",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        mockedBarangFindMany.mockResolvedValue(_mockBarangList);
        
        const result = await BarangService.filterBarang(query);
    
        expect(mockedBarangFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ],
                perusahaan_id: {
                    contains: "",
                }
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
        
        expect(result).toEqual(_mockBarangList);
      });
    
    it('should return filtered barang by kode with selected attributes ordered by name in ascending order when provided with kode query', async () => {
        const query = 'mas';
        const _mockBarangList = [
            {
                "id": "clk77y217000cof62bfo3xc1v",
                "nama": "Modern Plastic Keyboard",
                "harga": 8122344,
                "stok": 75,
                "perusahaan_id": "clk77y1zt0001of62mbhuhohv",
                "kode": "MAS",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        mockedBarangFindMany.mockResolvedValue(_mockBarangList);
        
        const result = await BarangService.filterBarang(query);
    
        expect(mockedBarangFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ],
                perusahaan_id: {
                    contains: "",
                }
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
        
        expect(result).toEqual(_mockBarangList);
      });
    
    it('should return filtered barang by company with selected attributes ordered by name in ascending order when provided with company id', async () => {
        const perusahaan_id = 'clk77y1zt0001of62mbhuhohv';
        const _mockBarangList = [
            {
                "id": "clk77y217000cof62bfo3xc1v",
                "nama": "Modern Plastic Keyboard",
                "harga": 8122344,
                "stok": 75,
                "perusahaan_id": "clk77y1zt0001of62mbhuhohv",
                "kode": "MAS",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        mockedBarangFindMany.mockResolvedValue(_mockBarangList);
        
        const result = await BarangService.filterBarang(undefined, 'clk77y1zt0001of62mbhuhohv');
    
        expect(mockedBarangFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: "",
                            mode: 'insensitive'
                        }
                    }
                ],
                perusahaan_id: {
                    contains: "clk77y1zt0001of62mbhuhohv",
                }
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
        
        expect(result).toEqual(_mockBarangList);
      });
  });

  describe('getBarangById', () => {
    it('should return barang if found', async () => {
        const id = 'clk77y21e000eof62kwb4bdhl';
        const mockBarang =  {
            id: "clk77y21e000eof62kwb4bdhl",
            nama: "Elegant Concrete Ball",
            harga: 60000,
            stok: 51,
            perusahaan_id: "clk77y1zx0002of620j3kbe6x",
            kode: "SRQ",
            created_at: new Date(),
            updated_at: new Date(),
	    };  

        mockedBarangFindFirst.mockResolvedValue(mockBarang);

        const result = await BarangService.getBarangById(id);

        expect(mockedBarangFindFirst).toHaveBeenCalledWith({
            where: {
                id: id
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            }
        });

        expect(result).toEqual(mockBarang);
    });

    it('should throw an error when ID does not exist', async () => {
        const id = 'unknownid';

        mockedBarangFindFirst.mockResolvedValue(null);

        await expect(BarangService.getBarangById(id)).rejects.toThrow(
            new HttpError(HttpStatusCode.NotFound, 'Barang not found')
          );
      
        expect(mockedBarangFindFirst).toHaveBeenCalledWith({
            where: {
                id: id
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            }
        });
    });
  });

  describe('createBarang', () => {
    it('should create a new barang when all inputs are valid', async () => {
        const nama = 'Barang 1';
        const harga = 100;
        const stok = 50;
        const perusahaan_id = 'clk75yk1k0004wh1in65b2rgz';
        const kode = 'ABC';
    
        const mockPerusahaan = {
			"id": "clk75yk1k0004wh1in65b2rgz",
			"nama": "Erdman and Sons",
			"alamat": "4450 Joel Place",
			"no_telp": "797-761-9405 x19749",
			"kode": "XUN"
		}
    
        const mockCreatedBarang = {
			id: "barangid",
			nama: nama,
			harga: 100,
            stok: 50,
            perusahaan_id: 'clk75yk1k0004wh1in65b2rgz',
            kode: 'ABC',
            created_at: new Date(),
            updated_at: new Date(),
		}
    
        mockedGetPerusahaanById.mockResolvedValue(mockPerusahaan);
        mockedBarangCreate.mockResolvedValue(mockCreatedBarang);
    
        const result = await BarangService.createBarang(nama, harga, stok, perusahaan_id, kode);
    
        expect(mockedGetPerusahaanById).toHaveBeenCalledTimes(1);
        expect(mockedGetPerusahaanById).toHaveBeenCalledWith(perusahaan_id);
    
        expect(mockedBarangCreate).toHaveBeenCalledTimes(1);
        expect(mockedBarangCreate).toHaveBeenCalledWith({
          data: {
            nama: nama,
            harga: harga,
            stok: stok,
            perusahaan_id: perusahaan_id,
            kode: kode,
          },
          select: {
            id: true,
            nama: true,
            harga: true,
            stok: true,
            perusahaan_id: true,
            kode: true,
          },
        });
    
        expect(result).toEqual(mockCreatedBarang);
      });
    
      it('should throw an error when the kode is invalid', async () => {
        const nama = 'Barang 2';
        const harga = 200;
        const stok = 20;
        const perusahaan_id = 'perusahaan_id';
        const kode = 'abc'; 
    
        await expect(BarangService.createBarang(nama, harga, stok, perusahaan_id, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null)
        );
    
        expect(mockedGetPerusahaanById).not.toHaveBeenCalled();
    
        expect(mockedBarangCreate).not.toHaveBeenCalled();
      });
    
      it('should throw an error when the perusahaan is not found', async () => {
        const nama = 'Barang 3';
        const harga = 300;
        const stok = 30;
        const perusahaan_id = 'UnknownPerusahaan'; 
        const kode = 'XYZ';
    
        mockedGetPerusahaanById.mockImplementation(() => {
            throw new HttpError(HttpStatusCode.NotFound, "Perusahaan not found")
        });
    
        await expect(BarangService.createBarang(nama, harga, stok, perusahaan_id, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null)
        );
    
        expect(mockedGetPerusahaanById).toHaveBeenCalledTimes(1);
        expect(mockedGetPerusahaanById).toHaveBeenCalledWith(perusahaan_id);
    
        expect(mockedBarangCreate).not.toHaveBeenCalled();
      });
  });

  describe('updateBarang', () => {
    it('should update the barang when all inputs are valid', async () => {
        const id = 'barang_id';
        const nama = 'Updated Barang';
        const harga = 300;
        const stok = 50;
        const perusahaan_id = 'clk75yk1k0004wh1in65b2rgz';
        const kode = 'XYZ';
    
        const mockPerusahaan = {
			"id": "clk75yk1k0004wh1in65b2rgz",
			"nama": "Erdman and Sons",
			"alamat": "4450 Joel Place",
			"no_telp": "797-761-9405 x19749",
			"kode": "XUN"
		}
    
        const mockUpdatedBarang = {
			id: "barang_id",
			nama: nama,
			harga: 100,
            stok: 50,
            perusahaan_id: 'clk75yk1k0004wh1in65b2rgz',
            kode: 'ABC',
            created_at: new Date(),
            updated_at: new Date(),
		}
    
        mockedGetPerusahaanById.mockResolvedValue(mockPerusahaan);
    
        mockedBarangUpdate.mockResolvedValue(mockUpdatedBarang);
    
        const result = await BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode);
    
        expect(mockedGetPerusahaanById).toHaveBeenCalledTimes(1);
        expect(mockedGetPerusahaanById).toHaveBeenCalledWith(perusahaan_id);
    
        expect(mockedBarangUpdate).toHaveBeenCalledTimes(1);
        expect(mockedBarangUpdate).toHaveBeenCalledWith({
          where: {
            id: id,
          },
          data: {
            nama: nama,
            harga: harga,
            stok: stok,
            perusahaan_id: perusahaan_id,
            kode: kode,
          },
          select: {
            id: true,
            nama: true,
            harga: true,
            stok: true,
            perusahaan_id: true,
            kode: true,
          },
        });
    
        expect(result).toEqual(mockUpdatedBarang);
      });
    
    it('should throw an error when the kode is invalid', async () => {
        const id = 'barang_id';
        const nama = 'Invalid Barang';
        const harga = 400;
        const stok = 20;
        const perusahaan_id = 'perusahaan_id';
        const kode = 'AS3'; 
    
        await expect(BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null)
        );
    
        expect(mockedGetPerusahaanById).not.toHaveBeenCalled();
    
        expect(mockedBarangUpdate).not.toHaveBeenCalled();
      });
    
    it('should throw an error when the perusahaan is not found', async () => {
        const id = 'barang_id';
        const nama = 'Unknown Barang';
        const harga = 500;
        const stok = 30;
        const perusahaan_id = 'UnknownPerusahaan'; 
        const kode = 'ABC';
    
        mockedGetPerusahaanById.mockImplementation(() => {
            throw new HttpError(HttpStatusCode.NotFound, "Perusahaan not found")
        });
    
        await expect(BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null)
        );
    
        expect(mockedGetPerusahaanById).toHaveBeenCalledTimes(1);
        expect(mockedGetPerusahaanById).toHaveBeenCalledWith(perusahaan_id);
    
        expect(mockedBarangUpdate).not.toHaveBeenCalled();
      });
    
    it('should throw an error when ID does not exist', async () => {
        const id = 'non_existing_id';
        const nama = 'Unknown Barang';
        const harga = 500;
        const stok = 30;
        const perusahaan_id = 'perusahaan_id'; 
        const kode = 'ABC';

        const mockPerusahaan = {
			"id": "clk75yk1k0004wh1in65b2rgz",
			"nama": "Erdman and Sons",
			"alamat": "4450 Joel Place",
			"no_telp": "797-761-9405 x19749",
			"kode": "XUN"
		}
    
        mockedGetPerusahaanById.mockResolvedValue(mockPerusahaan);
    
        mockedBarangUpdate.mockImplementation(() => {
            throw new PrismaClientKnownRequestError('Barang not found', {clientVersion: 'v1.0', code: '400'});
        })
    
        await expect(BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Barang not found', null)
        );
    
        expect(mockedBarangUpdate).toHaveBeenCalledTimes(1);
        expect(mockedBarangUpdate).toHaveBeenCalledWith({
            where: {
                id: id
            },
            data: {
                nama: nama,
                harga: harga,
                stok: stok,
                perusahaan_id: perusahaan_id,
                kode: kode
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            }
        });
      });
  });

  describe('deleteBarang', () => {
    it('should delete the barang when ID exists', async () => {
        const id = 'existing_id';
    
        const mockDeletedBarang = {
            "id": "clk77y21e000eof62kwb4bdhl",
            "nama": "Elegant Concrete Ball",
            "harga": 60000,
            "stok": 51,
            "perusahaan_id": "clk77y1zx0002of620j3kbe6x",
            "kode": "SRQ",
            created_at: new Date(),
            updated_at: new Date()
        }
    
        mockedBarangDelete.mockResolvedValue(mockDeletedBarang);
    
        const result = await BarangService.deleteBarang(id);
    
        expect(mockedBarangDelete).toHaveBeenCalledTimes(1);
        expect(mockedBarangDelete).toHaveBeenCalledWith({
          where: {
            id: id,
          },
          select: {
            id: true,
            nama: true,
            harga: true,
            stok: true,
            perusahaan_id: true,
            kode: true,
          },
        });
    
        expect(result).toEqual(mockDeletedBarang);
      });
    
      it('should throw an error when ID does not exist', async () => {
        const id = 'non_existing_id';
    
        mockedBarangDelete.mockImplementation(() => {
            throw new PrismaClientKnownRequestError('Barang not found', {clientVersion: 'v1.0', code: '400'});
        })
    
        await expect(BarangService.deleteBarang(id)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Barang not found', null)
        );
    
        expect(mockedBarangDelete).toHaveBeenCalledTimes(1);
        expect(mockedBarangDelete).toHaveBeenCalledWith({
          where: {
            id: id,
          },
          select: {
            id: true,
            nama: true,
            harga: true,
            stok: true,
            perusahaan_id: true,
            kode: true,
          },
        });
      });
  });
});
