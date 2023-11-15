//aqui configura a aplicação
import express from "express";
import connectDatabase  from "./src/database/db.js";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();

connectDatabase();

app.use(express.json());
app.use(router);
//app.use("/user", userRoute);


export default app;