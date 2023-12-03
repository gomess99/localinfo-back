import { Router } from "express";

import authController from "../controllers/auth.controller.js";

const AuthRoute = Router();

AuthRoute.post("/authpj", authController.loginPessoaJuridica);
AuthRoute.post("/authpf", authController.loginPessoaFisica);


export default AuthRoute;