//aqui sobe a aplicação
import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));