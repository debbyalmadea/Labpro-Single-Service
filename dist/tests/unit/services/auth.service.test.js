"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const services_1 = require("../../../src/services");
const utils_1 = require("../../../src/utils");
const types_1 = require("../../../src/common/types");
const models_1 = require("../../../src/models");
jest.mock('jsonwebtoken');
const jwtSignMock = jsonwebtoken_1.default.sign;
jest.mock('bcryptjs');
const compareMock = bcryptjs_1.compare;
const userService = new services_1.UserService(models_1.User);
const getUserByUsernameMock = jest.spyOn(userService, 'getUserByUsername');
const authService = new services_1.AuthService(userService);
describe('Auth Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('logIn', () => {
        it('should return user and token when provided with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const username = 'testuser';
            const password = 'testpassword';
            const mockUser = {
                username: 'testuser',
                name: 'Test User',
                password: 'hashedpassword',
                created_at: new Date(),
                updated_at: new Date(),
            };
            getUserByUsernameMock.mockResolvedValue(mockUser);
            compareMock.mockResolvedValue(true);
            jwtSignMock.mockReturnValue('mockedAccessToken');
            const result = yield authService.logIn(username, password);
            expect(result).toEqual({
                user: {
                    username: 'testuser',
                    name: 'Test User',
                },
                token: 'mockedAccessToken',
            });
        }));
        it('should throw HttpError with NotFound status code when provided with non-existing username', () => __awaiter(void 0, void 0, void 0, function* () {
            const username = 'nonexistentuser';
            const password = 'testpassword';
            getUserByUsernameMock.mockImplementation(() => {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, "User not found");
            });
            yield expect(authService.logIn(username, password)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'User not found'));
        }));
        it('should throw HttpError with Unauthorized status code when provided with invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
            const username = 'testuser';
            const password = 'wrongpassword';
            const mockUser = {
                username: 'testuser',
                name: 'Test User',
                password: 'hashedpassword',
                created_at: new Date(),
                updated_at: new Date(),
            };
            getUserByUsernameMock.mockResolvedValue(mockUser);
            compareMock.mockResolvedValue(false);
            yield expect(authService.logIn(username, password)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.Unauthorized, 'Invalid password'));
        }));
    });
});
