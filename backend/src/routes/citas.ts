import { Router } from "express";
import { atendercita, atenderconliga, citasactual, getCita, getcitas, getcitasagrupadas, getservidor, saveregistro, validafecha } from "../controllers/citas";


const router = Router();

router.get("/api/citas/getservidor/:id", getservidor)  
router.get("/api/citas/validafecha/:id", validafecha)
router.post("/api/citas/saveregistro/", saveregistro)    
router.get("/api/citas/getcitaservidor/:id", getCita) 
router.get("/api/citas/getcitas/:fecha", getcitas) 
router.post("/api/citas/enviarliga/", atenderconliga) 
router.get("/api/citas/atendercita/:id", atendercita) 
router.get("/api/citas/citasagrupadas/", getcitasagrupadas) 
router.get("/api/citas/citasactual/", citasactual) 

export default router