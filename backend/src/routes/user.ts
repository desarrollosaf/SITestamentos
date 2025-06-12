import { Router } from "express";
import { getRegistros } from "../controllers/usuario";

const router = Router();

router.get("/api/user/read", getRegistros)


export default router