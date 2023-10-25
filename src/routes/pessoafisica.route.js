import {Router} from "express";
import pessoafisicaController from "../controllers/pessoajuridica.controller.js"
import { validId, validPessoaFisica } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", pessoafisicaController.create); // cria users
router.get("/", pessoafisicaController.findAll); // busca todo users
router.get("/:id", validId, validPessoaFisica, pessoafisicaController.findById); // busca users id
router.patch("/:id", validId, validPessoaFisica, pessoafisicaController.update);


export default router;