"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1234;
const whitelist = ['http://127.0.0.1:8000', 'http://localhost:5173', 'https://ohl-fe.vercel.app'];
app.use((0, cors_1.default)({
    origin: whitelist
}));
app.use(body_parser_1.default.json());
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.use('/api/v1', routes_1.default);
