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
const user_1 = __importDefault(require("../routes/saf/user"));
const estados_1 = __importDefault(require("../routes/fun/estados"));
const datosp_1 = __importDefault(require("../routes/fun/datosp"));
const user_2 = __importDefault(require("../routes/user"));
const solicitudes_1 = __importDefault(require("../routes/solicitudes"));
const user_3 = __importDefault(require("../models/user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
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
        this.app.use(user_1.default);
        this.app.use(estados_1.default);
        this.app.use(datosp_1.default);
        this.app.use(user_2.default);
        this.app.use(solicitudes_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use('/storage', express_1.default.static(path_1.default.join(process.cwd(), 'storage')));
    }
    DBconnetc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_3.default.sync();
                console.log("Conexion de DB exitoso");
            }
            catch (error) {
                console.log("Conexion de DB errorena => " + error);
            }
        });
    }
}
exports.default = Server;
