import { Router } from "express";
import { getservidor, saveregistro, validafecha } from "../controllers/citas";


const router = Router();

router.get("/api/citas/getservidor/:id", getservidor)  
router.get("/api/citas/validafecha/:id", validafecha)
router.post("/api/citas/saveregistro/", saveregistro)



export default router