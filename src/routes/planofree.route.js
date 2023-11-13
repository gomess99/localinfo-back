import { Router } from "express";
const router = Router();

import { create, findAll, topPlanoFree, findById, searchByCategoria, byPessoaJuridica, updatePlanoFree, erasePlanoFree, likesPlanoFree} from "../controllers/planofree.controllers.js"
import { autMiddlewarePessoaFuridica } from "../middlewares/auth.middlewares.js";

//rotas de busca
router.post("/", autMiddlewarePessoaFuridica, create)
router.get("/", findAll)
router.get("/top", topPlanoFree)
router.get("/search", searchByCategoria)
router.get("/byPessoaJuridica", autMiddlewarePessoaFuridica, byPessoaJuridica)
router.get("/:id", autMiddlewarePessoaFuridica, findById)
//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

//rotas de modificação
router.patch("/:id", autMiddlewarePessoaFuridica, updatePlanoFree);
router.delete("/:id", autMiddlewarePessoaFuridica, erasePlanoFree);
router.patch("/likes/:id", autMiddlewarePessoaFuridica, likesPlanoFree);


export default router;