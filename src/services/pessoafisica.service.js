import pessoafisicarepositories from "../repositories/pessoafisicarepositories.js";
import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";

const create = async (body) => {
  const {
    name,
    username,
    email,
    password,
    avatar,
  } = body;

  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !avatar
  )
    throw new Error("Nem todos os componentes estão preenchidos");

  const foundPessoaFisica =
    await pessoafisicarepositories.findByEmailPessoaFisicaRepository(email);

  if (foundPessoaFisica) throw new Error("Perfil Físico existente");

  const pessoafisica =
    await pessoafisicarepositories.createServiceRepository(body);

  if (!pessoafisica) throw new Error("Erro ao criar pessoa física");

  const token = authService.generateToken(pessoafisica.id);

  return token;
};

const findAll = async () => {
  const pessoafisicas =
    await pessoafisicarepositories.findAllServiceRepository();

  if (pessoafisicas.length === 0)
    throw new Error("Nenhuma Pessoa Física cadastrada");

  return pessoafisicas;
};

async function findById(pessoafisicaIdParam, pessoafisicaIdLogged) {
  let idParam;
  if (!pessoafisicaIdParam) {
    pessoafisicaIdParam = pessoafisicaIdLogged;
    idParam = pessoafisicaIdParam;
  } else {
    idParam = pessoafisicaIdParam;
  }

  if (!idParam)
    throw new Error("Use um ID para encontrar o perfil da pessoa Física");

  const pessoafisica =
    await pessoafisicarepositories.findByIdServiceRepository(idParam);

  if (!pessoafisica) throw new Error("Pessoa Física not found");

  return pessoafisica;
};

const update = async (body, pessoafisicaId) => {
  const {
    name,
    username,
    email,
    password,
    avatar,
  } = body;

  if (
    !name &&
    !username &&
    !email &&
    !password &&
    !avatar
  )
    throw new Error("Necessário pelo menos um campo para realizar o update");

  const pessoafisica =
    await pessoafisicarepositories.findByIdServiceRepository(pessoafisicaId);

  if (pessoafisica._id != pessoafisicaId)
    new Error("Você não pode dar update com esse usuário");

  if (password) password = await bcrypt.hash(password, 10);

  await pessoafisicarepositories.updateServiceRepository(
    pessoafisicaId,
    body
  );

  return { message: "Pessoa Física atualizada com sucesso" };
};

export default {
  create,
  findAll,
  findById,
  update,
};
