"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_NAME = void 0;
exports.DB_NAME = 'LEARNING_MANAGEMENT_SYSTEM_DB';
exports.JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';
