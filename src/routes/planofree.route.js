import { Router } from "express";
import PlanoFreeController from "../controllers/planofree.controllers.js"
import { autMiddlewarePessoaJuridica } from "../middlewares/auth.middlewares.js";

const PlanoFreeRouter = Router();

//rotas de busca
PlanoFreeRouter.get("/search", PlanoFreeController.searchPlanoFreeController)
PlanoFreeRouter.post("/create", autMiddlewarePessoaJuridica, PlanoFreeController.createPlanoFreeController)
PlanoFreeRouter.get("/", PlanoFreeController.findAllPlanoFreeController)
PlanoFreeRouter.get("/top", PlanoFreeController.topPlanoFreeController)

PlanoFreeRouter.get("/byPessoaJuridica", autMiddlewarePessoaJuridica, PlanoFreeController.findPlanoFreeByUserIdController)
PlanoFreeRouter.get("/:id", PlanoFreeController.findPlanoFreeByIdController)
//obs: para pesquisar normal não precisa de autenticação, mas para pesquisar pelo id é necessário

//rotas de modificação
PlanoFreeRouter.patch("/update/:id", autMiddlewarePessoaJuridica, PlanoFreeController.updatePlanoFreeController);
PlanoFreeRouter.delete("/delete/:id", autMiddlewarePessoaJuridica, PlanoFreeController.deletePlanoFreeController);
PlanoFreeRouter.patch("/likes/:id", autMiddlewarePessoaJuridica, PlanoFreeController.likePlanoFreeController);

export default PlanoFreeRouter;