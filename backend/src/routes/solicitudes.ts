import { Router } from "express";
import { saveinfo } from "../controllers/solicitud";
import { upload } from "../controllers/multer";


const router = Router();


router.post("/api/solicitudes/create/",upload, saveinfo)


export default router