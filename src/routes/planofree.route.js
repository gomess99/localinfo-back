import { Router } from "express";
const router = Router();

import { create, findAll, topPlanoFree, findById} from "../controllers/planofree.controllers.js"
import { autMiddleware } from "../middlewares/auth.middlewares.js";

router.post("/", autMiddleware, create)
router.get("/", findAll)
router.get("/top", topPlanoFree)
router.get("/:id", findById)

export default router;