import { Router } from "express";
import { create, findAll, topPlanoFree, findById, searchByCategoria, byPessoaJuridica, updatePlanoFree, erasePlanoFree, likesPlanoFree} from "../controllers/planofree.controllers.js"
import { autMiddlewarePessoaFuridica } from "../middlewares/auth.middlewares.js";

const PlanoFreeRouter = Router();

//rotas de busca
PlanoFreeRouter.post("/", autMiddlewarePessoaFuridica, create)
PlanoFreeRouter.get("/", findAll)
PlanoFreeRouter.get("/top", topPlanoFree)
PlanoFreeRouter.get("/search", searchByCategoria)
PlanoFreeRouter.get("/byPessoaJuridica", autMiddlewarePessoaFuridica, byPessoaJuridica)
PlanoFreeRouter.get("/:id", autMiddlewarePessoaFuridica, findById)
//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

//rotas de modificação
PlanoFreeRouter.patch("/:id", autMiddlewarePessoaFuridica, updatePlanoFree);
PlanoFreeRouter.delete("/:id", autMiddlewarePessoaFuridica, erasePlanoFree);
PlanoFreeRouter.patch("/likes/:id", autMiddlewarePessoaFuridica, likesPlanoFree);


export default PlanoFreeRouter;