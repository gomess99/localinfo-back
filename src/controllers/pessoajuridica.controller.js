import { response } from "express";
import pessoajuridicaService from "../services/pessoajuridica.service.js";

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
  const { id: pessoajuridicaId} = req.params;
  const idLogged = req.pessoajuridicaId;
  try {
    const pessoajuridica = await pessoajuridica.findById(pessoajuridicaId, idLogged);

    res.send(pessoajuridica);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const body = req.body;
  const pessoajuridicaId = req.pessoajuridicaId;
  try {
    const response = await pessoajuridicaService.updateService(body, pessoajuridicaId);

    return res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default {
  create,
  findAll,
  findById,
  update,
};
