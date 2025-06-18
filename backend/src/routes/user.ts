import { Router } from "express";
import { LoginUser, ReadUser } from "../controllers/users";

const router = Router();
router.post("/api/user/login", LoginUser)
router.get("/api/user/getusers", ReadUser)

export default router