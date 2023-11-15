import express from "express";
import connectDatabase  from "./database/db.js";
import "dotenv/config";

import userRoute from "./routes/user.route.js"
import pessoafisicaRoute from "./routes/pessoafisica.route.js";
import pessoajuridicaRoute from "./routes/pessoajuridica.route.js";
import authRoute from "./routes/auth.route.js"
import planofreeRoute from "./routes/planofree.route.js"
import swaggerRoute from "./routes/swagger.route.cjs"


const port = process.env.PORT || 3010;
const app = express();

connectDatabase();

app.use(express.json());
//app.use("/user", userRoute);
app.use("/pessoafisica", pessoafisicaRoute);
app.use("/pessoajuridica", pessoajuridicaRoute);
app.use("/auth", authRoute);
app.use("/planofree", planofreeRoute);
app.use("/doc", swaggerRoute);

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
