import { Router } from "express";
const router = Router();

import {loginPessoaFisica, loginPessoaJuridica} from "../controllers/auth.controller.js"

router.post("/", loginPessoaFisica);
router.post("/", loginPessoaJuridica);

export default router;