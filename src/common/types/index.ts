import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Request, Response } from "express"

export enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
  }

export type Handler = (req: Request, res: Response) => Promise<Response>

export interface IAuthController {
  logIn: Handler
}

export interface IBarangController {
  getAllBarang: Handler;
  getBarangById: Handler;
  createBarang: Handler;
  updateBarang: Handler;
  deleteBarang: Handler;
  decreaseStokBarang: Handler;
}

export interface IPerusahaanController {
  getAllPerusahaan: Handler;
  getPerusahaanById: Handler;
  createPerusahaan: Handler;
  updatePerusahaan: Handler;
  deletePerusahaan: Handler;
}

export interface IUserController {
  getSelfDetail: Handler;
}

export interface IJsonResponseBuilder {
  setStatusCode: (code: HttpStatusCode) => IJsonResponseBuilder;
  withMessage: (message: string) => IJsonResponseBuilder;
  withData: (data: Object | undefined | null) => IJsonResponseBuilder;
  make: () => Response
}

export interface IJsonResponse {
  success: (statusCode?: HttpStatusCode) => IJsonResponseBuilder;
  error: (statusCode?: HttpStatusCode) => IJsonResponseBuilder;
}

export interface IAuthService {
  logIn: (username: string, password: string) => Promise<{
    user: {
        username: string;
        name: string;
    };
    token: string;
  }>
}

export interface IUserService {
  getUserByUsername: (username: string) => Promise<{
    username: string;
    name: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  }>
}

interface Barang {
    id: string;
    nama: string;
    harga: number;
    stok: number;
    perusahaan_id: string;
    kode: string;
}

export interface IBarangService {
  getAllBarang: () => Promise<Barang[]>
  filterBarang: (q?: string, perusahaan_id?: string) => Promise<Barang[]>
  getBarangById: (id: string) => Promise<Barang>;
  createBarang: (nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) => Promise<Barang>;
  updateBarang: (id: string, nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) => Promise<Barang>;
  deleteBarang: (id: string) => Promise<Barang>;
  decreaseStokBarang: (id: string, stok: number) => Promise<Barang>;
}

interface Perusahaan {
  id: string;
  nama: string;
  alamat: string;
  no_telp: string;
  kode: string;
}

export interface IPerusahaanService {
  getAllPerusahaan: () => Promise<Perusahaan[]>
  filterPerusahaan: (q?: string) => Promise<Perusahaan[]>
  getPerusahaanById: (id: string) => Promise<Perusahaan>;
  createPerusahaan: (nama: string, alamat: string, no_telp: string, kode: string) => Promise<Perusahaan>;
  updatePerusahaan: (id: string, nama: string, alamat: string, no_telp: string, kode: string) => Promise<Perusahaan>;
  deletePerusahaan: (id: string) => Promise<Perusahaan>;
}

export type UserModel =  Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined, DefaultArgs>;
export type BarangModel = Prisma.BarangDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined, DefaultArgs>;
export type PerusahaanModel = Prisma.PerusahaanDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined, DefaultArgs>