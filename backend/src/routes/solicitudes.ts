import { Router } from "express";
import { getsolicitud, getsolicitudes, saveinfo } from "../controllers/solicitud";
import { upload } from "../controllers/multer";


const router = Router();


router.post("/api/solicitudes/create/:curp",upload, saveinfo)
router.get("/api/solicitudes/getsolicitudes/", getsolicitudes)
router.get("/api/solicitudes/getsolicitud/:id", getsolicitud)



export default router