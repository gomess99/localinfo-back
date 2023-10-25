import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));
}

export const connectDatabasePessoaFisica = () => {
    mongoose.connect(
        process.env.MONGODB_URI_PESSOA_FISICA,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Pessoa Física connected"))
    .catch((error) => console.log(error));
}

export const connectDatabasePessoaJuridica = () => {
    mongoose.connect(
        process.env.MONGODB_URI_PESSOA_JURIDICA,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Pessoa Jurídica connected"))
    .catch((error) => console.log(error));
}
