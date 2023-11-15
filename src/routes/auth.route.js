import { Router } from "express";

import {loginPessoaFisica, loginPessoaJuridica} from "../controllers/auth.controller.js"

const AuthRoute = Router();

AuthRoute.post("/", loginPessoaFisica);
AuthRoute.post("/", loginPessoaJuridica);

export default AuthRoute;