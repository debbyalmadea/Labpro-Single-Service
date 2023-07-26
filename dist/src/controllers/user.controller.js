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
const services_1 = require("../services");
const types_1 = require("../common/types");
const utils_1 = require("../utils");
class UserController {
    getSelfDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(res.locals.user);
            const data = yield services_1.UserService.getUserByUsername(res.locals.user.username);
            const jsonResponse = new utils_1.JsonResponse(res);
            if (!data) {
                return jsonResponse.error(types_1.HttpStatusCode.NotFound)
                    .withMessage("User not found")
                    .make();
            }
            else {
                return jsonResponse.success()
                    .withData({
                    username: data.username,
                    name: data.name
                }).make();
            }
        });
    }
}
exports.default = new UserController();
