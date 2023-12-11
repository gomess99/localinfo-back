import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";

dotenv.config();

function generateToken(id) {
  try {
    return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
}

const loginServicePessoaJuridica = async ({ email, password }) => {
  const pessoajuridica =
    await pessoajuridicarepositories.findByEmailPessoaJuridicaRepository(email);

  if (!pessoajuridica) {
    throw new Error("User not found");
  }

  if (!pessoajuridica.password) {
    throw new Error("User password not set");
  }

  const isPasswordValid = await bcrypt.compare(password, pessoajuridica.password);


  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  if (!isPasswordValid) throw new Error("Invalid password");
  console.log("ID da pessoa jurídica:", pessoajuridica.id);
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
