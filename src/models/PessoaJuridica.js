import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SocialMediaSchema = new mongoose.Schema({
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
});

const ContatoSchema = new mongoose.Schema({
  celular: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
});

const EnderecoSchema = new mongoose.Schema({
  endereco1: {
    type: String,
    required: false,
  },
  endereco2: {
    type: String,
    required: false,
  },
});

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
  redessociais: SocialMediaSchema,

  contatos: ContatoSchema,

  endereco: EnderecoSchema,
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
