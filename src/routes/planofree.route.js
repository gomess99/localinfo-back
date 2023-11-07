import { Router } from "express";
const router = Router();

import { create, findAll} from "../controllers/planofree.controllers.js"

router.post("/", create)
router.get("/", findAll)

export default router;