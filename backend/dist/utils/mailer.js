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
exports.sendEmail = void 0;
const nodemailer = require('nodemailer');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carga las variables de entorno
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Si usas port 465, cámbialo a true
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendEmail = (to_1, subject_1, html_1, ...args_1) => __awaiter(void 0, [to_1, subject_1, html_1, ...args_1], void 0, function* (to, subject, html, attachments = []) {
    try {
        yield transporter.sendMail({
            from: `"Voluntariado" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            attachments,
        });
        console.log(`Correo enviado a: ${to}`);
    }
    catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
