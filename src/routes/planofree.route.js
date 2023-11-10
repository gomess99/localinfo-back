import { Router } from "express";
const router = Router();

import { create, findAll, topPlanoFree, findById, searchByCategoria, byPessoaJuridica, updatePlanoFree, erasePlanoFree} from "../controllers/planofree.controllers.js"
import { autMiddleware } from "../middlewares/auth.middlewares.js";

//rotas de busca
router.post("/", autMiddleware, create)
router.get("/", findAll)
router.get("/top", topPlanoFree)
router.get("/search", searchByCategoria)
router.get("/byPessoaJuridica", autMiddleware, byPessoaJuridica)
router.get("/:id", autMiddleware, findById)
//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

//rotas de modificação

router.patch("/:id", autMiddleware, updatePlanoFree);
router.delete("/:id", autMiddleware, erasePlanoFree);



export default router;