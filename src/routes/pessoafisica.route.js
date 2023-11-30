import {Router} from "express";
import pessoafisicaController from "../controllers/pessoafisica.controller.js"
import { validId, validPessoaFisica } from "../middlewares/global.middlewares.js";

const PessoaFisicaRoute = Router();

PessoaFisicaRoute.post("/create", pessoafisicaController.create); // cria users
PessoaFisicaRoute.get("/", pessoafisicaController.findAll); // busca todo users
PessoaFisicaRoute.get("/:id", validId, validPessoaFisica, pessoafisicaController.findById); // busca users id
PessoaFisicaRoute.patch("/:id", validId, validPessoaFisica, pessoafisicaController.update);


export default PessoaFisicaRoute;