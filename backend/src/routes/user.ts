import { Router } from "express";
import { LoginUser } from "../controllers/users";

const router = Router();
router.post("/api/user/login", LoginUser)

export default router