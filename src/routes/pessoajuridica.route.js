import {Router} from "express";
import pessoajuridicaController from "../controllers/pessoajuridica.controller.js"
import { validId, validPessoaJuridica } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", pessoajuridicaController.create) //cria users
router.get("/", pessoajuridicaController.findAll) //busca todo users
router.get("/:id", validId, validPessoaJuridica, pessoajuridicaController.findById) //busca users id
router.patch("/:id", validId, validPessoaJuridica, pessoajuridicaController.update)

export default router;