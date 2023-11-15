import { Router } from "express";
import PessoaJuridicaRouter from "./pessoajuridica.route.js";
import PessoaFisicaRoute from "./pessoafisica.route.js";
import PlanoFreeRouter from "./planofree.route.js";
import AuthRoute from "./auth.route.js";
import SwaggerRoute from "./swagger.route.cjs";


const router = Router();

router.use("/pessoafisica", PessoaFisicaRoute);
router.use("/pessoajuridica", PessoaJuridicaRouter);
router.use("/auth", AuthRoute);
router.use("/planofree", PlanoFreeRouter);
router.use("/doc", SwaggerRoute);

export default router;