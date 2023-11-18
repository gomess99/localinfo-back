import { Router } from "express";

import {loginPessoaFisica, loginPessoaJuridica} from "../controllers/auth.controller.js"

const AuthRoute = Router();

AuthRoute.post("/authpj", loginPessoaJuridica);
AuthRoute.post("/authpf", loginPessoaFisica);


export default AuthRoute;