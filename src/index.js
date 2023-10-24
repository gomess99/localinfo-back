import express from "express";
import connetcDatabase from "./database/db.js"
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js"
import pessoafisicaRoute from "./services/pessoafisica.service.js";
import pessoajuridicaRoute from "./services/pessoafisica.service.js";
import authRoute from "./routes/auth.route.js"


dotenv.config();

const port = process.env.PORT || 3010;
const app = express();

connetcDatabase()
app.use(express.json());
app.use("/user", userRoute);
app.use("/pessoafisica", pessoafisicaRoute);
app.use("/pessoajuridica", pessoajuridicaRoute);
app.use("/auth", authRoute);

//ROTA
  //Method HTTP
    //GET - Pega um info
    //POST - Cria uma info
    //PUT - Altera toda info
    //Path - Altera a parte da info
    //Delete - Apaga uma info

  //NAME - um idendtificador da rota

  //Function (Callback) - Responsável por executar algum comando

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));