"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post("/api/user/login", users_1.LoginUser);
router.get("/api/user/getusers", users_1.ReadUser);
router.get('/api/user/me', users_1.getCurrentUser);
exports.default = router;
