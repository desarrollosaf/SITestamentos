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
exports.LoginUser = exports.CreateUser = exports.ReadUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/saf/users"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ReadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield users_1.default.findAll();
    return res.json({
        msg: `List de categoría encontrada exitosamenteeeee`,
        data: listUser
    });
});
exports.ReadUser = ReadUser;
const CreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*const { Uname, Ulastname, Upassword, Uemail, Ucredential } = req.body
    console.log(req.body);
    const userEmail = await User.findOne({ where: {  Uemail: Uemail  }})
    const userCredential = await User.findOne({ where: {  Ucredential: Ucredential  }})

    if (userEmail) {
        return next(JSON.stringify({ msg: `Usuario ya existe con el email ${Uemail}`}));
        /*return res.status(400).json({
            msg: `Usuario ya existe con el email ${Uemail}`
        })
    }

    if (userCredential) {
        return next(JSON.stringify({ msg: `Usuario ya existe con la credencial ${Ucredential}`}));
        /*
        return res.status(400).json({
            msg: `Usuario ya existe con la credencial ${Ucredential}`
        })
    }

    const UpasswordHash = await bcrypt.hash(Upassword, 10)
    try {
        User.create({
            name: Uname,
            lastname: Ulastname,
            Uemail: Uemail,
            Upassword: UpasswordHash,
            Ucredential: Ucredential,
            Ustatus: 1
        })

        return next(JSON.stringify({ msg: `User ${Uname} ${Ulastname} create success.`}));
        /*res.json({
            msg: `User ${Uname} ${Ulastname} create success.`
        })

    } catch (error) {
        return next(JSON.stringify({ msg: `Existe un error al crear el usuario => `, error}));
        /*res.status(400).json({
            msg: `Existe un error al crear el usuario => `, error
        })
    }*/
});
exports.CreateUser = CreateUser;
const LoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rfc, password } = req.body;
    let passwordValid = false;
    let user = null;
    let bandera = true;
    if (rfc.startsWith('NOT25')) {
        bandera = false;
        user = yield user_1.default.findOne({
            where: { name: rfc },
        });
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el rfc ${rfc}`
            });
        }
        passwordValid = yield bcrypt_1.default.compare(password, user.password);
    }
    else {
        user = yield users_1.default.findOne({
            where: { rfc: rfc },
        });
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el rfc ${rfc}`
            });
        }
        const hash = user.password.replace(/^\$2y\$/, '$2b$');
        passwordValid = yield bcrypt_1.default.compare(password, hash);
    }
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        rfc: rfc
    }, process.env.SECRET_KEY || 'TSE-Poder-legislativo', { expiresIn: 10000 });
    return res.json({ token, user, bandera });
});
exports.LoginUser = LoginUser;
