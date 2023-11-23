import { Router } from "express";
import { create, findAll, topPlanoFree, findById, searchByName, byPessoaJuridica, updatePlanoFree, erasePlanoFree, likesPlanoFree} from "../controllers/planofree.controllers.js"
import { autMiddlewarePessoaJuridica } from "../middlewares/auth.middlewares.js";

const PlanoFreeRouter = Router();

//rotas de busca
PlanoFreeRouter.post("/", autMiddlewarePessoaJuridica, create)
PlanoFreeRouter.get("/", findAll)
PlanoFreeRouter.get("/top", topPlanoFree)
PlanoFreeRouter.get("/search", searchByName)
PlanoFreeRouter.get("/byPessoaJuridica", autMiddlewarePessoaJuridica, byPessoaJuridica)
PlanoFreeRouter.get("/:id", autMiddlewarePessoaJuridica, findById)
//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

//rotas de modificação
PlanoFreeRouter.patch("/:id", autMiddlewarePessoaJuridica, updatePlanoFree);
PlanoFreeRouter.delete("/:id", autMiddlewarePessoaJuridica, erasePlanoFree);
PlanoFreeRouter.patch("/likes/:id", autMiddlewarePessoaJuridica, likesPlanoFree);


export default PlanoFreeRouter;