import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });
  //tempo para expirar de 24h
}


const loginServicePessoaJuridica = async ({ email, password }) => {
  const pessoajuridica =
    await pessoajuridicarepositories.findByEmailPessoaJuridicaRepository(email);

  if (!pessoajuridica) throw new Error("Wrong password or username");

  const isPasswordValid = await bcrypt.compare(
    password,
    pessoajuridica.password
  );

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(pessoajuridica.id);

  return token;
};

const loginServicePessoaFisica = async ({ email, password }) => {
  const pessoafisica =
    await pessoajuridicarepositories.findByEmailPessoaJuridicaRepository(email);

  if (!pessoafisica) throw new Error("Wrong password or username");

  const isPasswordValid = await bcrypt.compare(password, pessoafisica.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(pessoafisica.id);

  return token;
};

export default {
  loginServicePessoaJuridica,
  loginServicePessoaFisica,
  generateToken,
};
