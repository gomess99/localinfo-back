import { Router } from "express";
import PessoaJuridicaRouter from "./pessoajuridica.route";

const router = Router();

router.use("/pessoafisica", pessoafisicaRoute);
router.use("/pessoajuridica", PessoaJuridicaRouter);
router.use("/auth", authRoute);
router.use("/planofree", planofreeRoute);
router.use("/doc", swaggerRoute);

export default router;