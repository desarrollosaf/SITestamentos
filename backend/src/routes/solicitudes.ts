import { Router } from "express";
import { getsolicitud, getsolicitudes, getsolicitudesapi, saveinfo, saveprogreso } from "../controllers/solicitud";
import { upload } from "../controllers/multer";
import verifyAccessToken from '../middlewares/verifyAccessToken';


const router = Router();


router.post("/api/solicitudes/create/:curp",upload, saveinfo)
router.get("/api/solicitudes/getsolicitudes/", getsolicitudes)
router.get("/api/solicitudes/getsolicitud/:id", getsolicitud)
router.get('/api/solicitudes/getsolicitudesapi/', verifyAccessToken, getsolicitudesapi);
router.post("/api/solicitudes/saveprogreso/:curp",upload, saveprogreso)



export default router