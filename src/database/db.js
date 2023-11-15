import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Erro ao conectar com o MongoDB"));
}

export default connectDatabase;
