import { Router } from "express";
import { getservidor } from "../controllers/citas";


const router = Router();

router.get("/api/citas/getservidor/:id", getservidor)



export default router