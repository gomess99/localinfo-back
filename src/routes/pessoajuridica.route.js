import {Router} from "express";
import pessoajuridicaController from "../controllers/pessoajuridica.controller.js"
import { validId, validPessoaJuridica } from "../middlewares/global.middlewares.js";

const PessoaJuridicaRouter = Router();

PessoaJuridicaRouter.post("/", pessoajuridicaController.create) //cria users
PessoaJuridicaRouter.get("/", pessoajuridicaController.findAll) //busca todo users
PessoaJuridicaRouter.get("/:id", validId, validPessoaJuridica, pessoajuridicaController.findById) //busca users id
PessoaJuridicaRouter.patch("/:id", validId, validPessoaJuridica, pessoajuridicaController.update) //atualiza user id

export default PessoaJuridicaRouter;