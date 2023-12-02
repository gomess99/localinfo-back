//aqui configura a aplicação
import cors from 'cors';
import express from "express";
import connectDatabase  from "./src/database/db.js";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    app.use(cors());
    next();
});

connectDatabase();

app.use(express.json());
app.use(router);
//app.use("/user", userRoute);


export default app;
