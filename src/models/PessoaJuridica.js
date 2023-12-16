import mongoose from "mongoose";
import bcrypt from "bcrypt";


const PessoaJuridicaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    unique: true,
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
  },
});

//faz a criptografia do password

//função pre, "antes de salvar algo..."
PessoaJuridicaSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//cria o usuário
const PessoaJuridica = mongoose.model("PessoaJuridica", PessoaJuridicaSchema);

export default PessoaJuridica;
