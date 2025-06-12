import { Router } from "express";
import { getRegistros } from "../controllers/colonias";

const router = Router();


router.get("/api/estados/getcodigo/:id", getRegistros)


export default router