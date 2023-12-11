import mongoose from "mongoose";
import userService from "../services/user.service.js";
import pessoajuridicaService from "../services/pessoajuridica.service.js";
import pessoafisicaService from "../services/pessoafisica.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Id não encontrado" });
    }

    next();
  } catch (err) {
    res.status(500).send({ menssage: err.menssage });
  }
};

export const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ menssage: "Usuário não encontrado" });
  }
  req.id = id;
  req.user = user;

  next();
};

export const validPessoaFisica = async (req, res, next) => {
  const id = req.params.id;

  const pessoafisica = await pessoafisicaService.findByIdService(id);

  if (!pessoafisica) {
    return res.status(400).send({ menssage: "Pessoa Física não encontrado" });
  }
  req.id = id;
  req.pessoafisica = pessoafisica;

  next();
};


export const validPessoaJuridica = async (req, res, next) => {
  try {
    let idParam;
    if (!req.params.id) {
      idParam = req.pessoajuridicaId;
    } else {
      idParam = req.params.id;
    }
    // console.log("ID recebido:", idParam);
    // console.log("ID recebido:", idParam);

    if (!mongoose.Types.ObjectId.isValid(idParam)) {
      return res.status(400).send({ message: "Invalid id!" });
    }

    next();
  } catch (error) {
    console.error("Erro no middleware validPessoaJuridica:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
