import {Router} from "express";
import pessoafisicaController from "../controllers/pessoajuridica.controller.js"
import { validId, validPessoaFisica } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/pessoafisica", pessoafisicaController.create) //cria users
router.get("/pessoafisica", pessoafisicaController.findAll) //busca todo users
router.get("/pessoafisica:id", validId, validPessoaFisica, pessoafisicaController.findById) //busca users id
router.patch("/pessoafisica:id", validId, validPessoaFisica, pessoafisicaController.update)

export default router;