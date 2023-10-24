import mongoose from "mongoose"; //importa a biblioteca do mongoose

const connetcDatabasePessoaFisica = () => {
    mongoose.connect(
        process.env.MONGODB_URI_PESSOA_FISICA, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    //exibi no terminal
    .then(() => console.log("MongoDB Pessoa Física conect"))
    .catch((error) => console.log(error))
}

export default connetcDatabasePessoaFisica;