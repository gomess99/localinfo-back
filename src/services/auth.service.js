import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";


const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
//tempo para expirar de 24h

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


export default{ loginServicePessoaJuridica, loginServicePessoaFisica, generateToken };
