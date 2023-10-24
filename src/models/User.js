import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //não retorna a senha em alguma consulta
    },
    avatar: {
        type: String,
        required: true,
    }
})

//faz a criptografia do password

//função pre, "antes de salvar algo..."
UserSchema.pre("save", async function (next){
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

//cria o usuário
const User = mongoose.model("User", UserSchema)

export default User;