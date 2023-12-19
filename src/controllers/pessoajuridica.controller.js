import pessoajuridicaService from "../services/pessoajuridica.service.js";
import bcrypt from "bcrypt";

//sempre que for consultar algo no bd, é preciso a espera e por isso usa-se async

const create = async (req, res) => {
  const body = req.body;

  try {
    const token = await pessoajuridicaService.create(body); //cria o usuário no BD

    return res.status(201).send(token);
  } catch (e) {
    return res.status(500).send(e.message)
  }
};

//relação assincrona usa-se async

const findAll = async (req, res) => {
  try {
    const pessoajuridica = await pessoajuridicaService.findAll(); //cria o usuário no BD

    return res.send(pessoajuridica);
  } catch (e) {
    return res.status(500).send(e.message)
  }
};

const findById = async (req, res) => {
  try {
    const pessoajuridica = await pessoajuridicaService.findById(
      req.params.id,
      req.pessoajuridicaId
    );

    return res.send(pessoajuridica);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

async function update(req, res) {
  try {
    const { name, username, email, password, avatar} = req.body;
    const { id: userId } = req.params;
    const userIdLogged = req.userId;

    const response = await pessoajuridicaService.update(
      { name, username, email, password, avatar },
      userId,
      userIdLogged
    );

    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}




export default {
  create,
  findAll,
  findById,
  update,
};
