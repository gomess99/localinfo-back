import PessoaFisica from "../models/PessoaFisica.js";

import PessoaJuridica from "../models/PessoaJuridica.js";

const loginRepositoryPessoaFisica = (email) =>
  PessoaFisica.findOne({ email: email }).select("+password");

const loginRepositoryPessoaJuridica = (email) =>
  PessoaJuridica.findOne({ email: email }).select("+password"); //aqui ele também trás a senha criptografada

export default {loginRepositoryPessoaFisica, loginRepositoryPessoaJuridica }