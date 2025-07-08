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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const estados_1 = __importDefault(require("../routes/fun/estados"));
const datosp_1 = __importDefault(require("../routes/fun/datosp"));
const user_1 = __importDefault(require("../routes/user"));
const solicitudes_1 = __importDefault(require("../routes/solicitudes"));
const citas_1 = __importDefault(require("../routes/citas"));
const users_1 = __importDefault(require("../models/saf/users"));
const auth_1 = require("../middlewares/auth");
const reportes_1 = __importDefault(require("../routes/reportes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3002';
        this.midlewares();
        this.router();
        this.DBconnetc();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("La aplicación se esta corriendo exitosamente en el puerto => " + this.port);
        });
    }
    router() {
        this.app.use(estados_1.default);
        this.app.use(datosp_1.default);
        this.app.use(user_1.default);
        this.app.use(solicitudes_1.default);
        this.app.use(citas_1.default);
        this.app.use(reportes_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use('/storage', express_1.default.static(path_1.default.join(process.cwd(), 'storage')));
        this.app.use(auth_1.verifyToken);
    }
    DBconnetc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_1.default.sync();
                console.log("Conexion de DB exitoso");
            }
            catch (error) {
                console.log("Conexion de DB errorena => " + error);
            }
        });
    }
}
exports.default = Server;
