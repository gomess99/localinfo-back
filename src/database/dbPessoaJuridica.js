import mongoose from "mongoose"; //importa a biblioteca do mongoose

const connetcDatabasePessoaJuridica = () => {
    mongoose.connect(
        process.env.MONGODB_URI_PESSOA_JURIDICA, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    //exibi no terminal
    .then(() => console.log("MongoDB Pessoa Jurídica conect"))
    .catch((error) => console.log(error))
}

export default connetcDatabasePessoaJuridica;