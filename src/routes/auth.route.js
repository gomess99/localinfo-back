import { Router } from "express";
const router = Router();

import {login} from "../controllers/auth.contoller.js"

router.post("/", login);

export default router;