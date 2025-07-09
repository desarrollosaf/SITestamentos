import { Router } from "express";
import { getCurrentUser, LoginUser, ReadUser } from "../controllers/users";

const router = Router();
router.post("/api/user/login", LoginUser)
router.get("/api/user/getusers", ReadUser)
router.get('/api/user/me', getCurrentUser);

export default router