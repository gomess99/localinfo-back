import { Router } from "express";
const router = Router();

import { create, findAll, topPlanoFree, findById, searchByCategoria} from "../controllers/planofree.controllers.js"
import { autMiddleware } from "../middlewares/auth.middlewares.js";

router.post("/", autMiddleware, create)
router.get("/", findAll)
router.get("/top", topPlanoFree)
router.get("/search", searchByCategoria)
router.get("/:id", autMiddleware, findById)

//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

export default router;