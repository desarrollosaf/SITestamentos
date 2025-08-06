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
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return req;
    const { client_id, client_secret } = req.body;
    if (client_id === 'cliente_externo' && client_secret === 'super_secreto') {
        const token = jsonwebtoken_1.default.sign({ client_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({
            access_token: token,
            token_type: 'Bearer',
            expires_in: 3600
        });
    }
    else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
});
exports.generateToken = generateToken;
