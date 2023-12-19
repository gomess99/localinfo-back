import {Router} from "express";
import pessoajuridicaController from "../controllers/pessoajuridica.controller.js"
import { validPessoaJuridica } from "../middlewares/global.middlewares.js";
import { autMiddlewarePessoaJuridica } from "../middlewares/auth.middlewares.js";


const PessoaJuridicaRouter = Router();

PessoaJuridicaRouter.post("/create", pessoajuridicaController.create) //cria users

PessoaJuridicaRouter.use(autMiddlewarePessoaJuridica);

PessoaJuridicaRouter.get("/", pessoajuridicaController.findAll) //busca todo users

PessoaJuridicaRouter.use(validPessoaJuridica);
PessoaJuridicaRouter.get("/findById/:id?", pessoajuridicaController.findById) //busca users id
PessoaJuridicaRouter.patch("/update/:id", pessoajuridicaController.update) //atualiza user id

export default PessoaJuridicaRouter;