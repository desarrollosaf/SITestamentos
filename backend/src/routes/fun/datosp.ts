import { Router } from "express";
import { getregistro } from "../../controllers/datos_personales";

const router = Router();


router.get("/api/datosp/getregistro/:id", getregistro)


export default router