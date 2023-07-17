"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenSecret = void 0;
const DEFAULT_ACCESS_TOKEN_SECRET = 'default_access_token_secret';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || DEFAULT_ACCESS_TOKEN_SECRET;
exports.accessTokenSecret = accessTokenSecret;
