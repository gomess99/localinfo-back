import { Router } from "express";
const router = Router();

import { create, findAll} from "../controllers/planofree.controllers.js"
import { autMiddleware } from "../middlewares/auth.middlewares.js";

router.post("/", autMiddleware, create)
router.get("/", findAll)

export default router;