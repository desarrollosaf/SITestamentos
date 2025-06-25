import { Router } from "express";
import { getCita, getcitas, getservidor, saveregistro, validafecha } from "../controllers/citas";


const router = Router();

router.get("/api/citas/getservidor/:id", getservidor)  
router.get("/api/citas/validafecha/:id", validafecha)
router.post("/api/citas/saveregistro/", saveregistro)    
router.get("/api/citas/getcitaservidor/:id", getCita) 
router.get("/api/citas/getcitas/", getcitas) 

export default router