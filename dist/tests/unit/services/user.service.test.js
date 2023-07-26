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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../src/models");
const services_1 = require("../../../src/services");
jest.mock("../../../src/models");
const mockedUserFindFirst = models_1.User.findFirst;
describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getUserByUsername', () => {
        it('should return user if found', () => __awaiter(void 0, void 0, void 0, function* () {
            const username = 'testuser';
            const mockUser = {
                username: 'testuser',
                name: 'Test User',
                password: 'hashedpassword',
                created_at: new Date(),
                updated_at: new Date(),
            };
            mockedUserFindFirst.mockResolvedValue(mockUser);
            const result = yield services_1.UserService.getUserByUsername(username);
            expect(mockedUserFindFirst).toHaveBeenCalledWith({
                where: {
                    username: username,
                },
            });
            expect(result).toEqual(mockUser);
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const username = 'unknownuser';
            mockedUserFindFirst.mockResolvedValue(null);
            const result = yield services_1.UserService.getUserByUsername(username);
            expect(mockedUserFindFirst).toHaveBeenCalledWith({
                where: {
                    username: username,
                },
            });
            expect(result).toBeNull();
        }));
    });
});
