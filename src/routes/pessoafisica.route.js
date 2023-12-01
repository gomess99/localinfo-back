import {Router} from "express";
import pessoafisicaController from "../controllers/pessoafisica.controller.js"
import { validId, validPessoaFisica } from "../middlewares/global.middlewares.js";
import { autMiddlewarePessoaFisica } from "../middlewares/auth.middlewares.js";

const PessoaFisicaRoute = Router();

PessoaFisicaRoute.post("/create", pessoafisicaController.create); // cria users

PessoaFisicaRoute.use(autMiddlewarePessoaFisica);
PessoaFisicaRoute.get("/", pessoafisicaController.findAll); // busca todo users

PessoaFisicaRoute.get("/findById/:id?", pessoafisicaController.findById); // busca users id
PessoaFisicaRoute.patch("/:id", pessoafisicaController.update);


export default PessoaFisicaRoute;