import { Router } from "express";
import { getinfo, getregistros } from "../controllers/reportes";

const router = Router();
router.get("/api/reporte/getinfo/", getinfo)  
router.post("/api/reporte/getregistros/", getregistros)

export default router