import {Router} from "express";
import pessoajuridicaController from "../controllers/pessoajuridica.controller.js"
import { validId, validPessoaJuridica } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/pessoajuridica", pessoajuridicaController.create) //cria users
router.get("/pessoajuridica", pessoajuridicaController.findAll) //busca todo users
router.get("/pessoajuridica:id", validId, validPessoaJuridica, pessoajuridicaController.findById) //busca users id
router.patch("/pessoajuridica:id", validId, validPessoaJuridica, pessoajuridicaController.update)

export default router;