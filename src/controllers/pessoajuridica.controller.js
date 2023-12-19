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

const update = async (req, res) => {
  try {
    let { name, username, email, password, avatar } = req.body;
    const pessoajuridicaId = req.pessoajuridicaId;

    // Verifique se a senha foi fornecida e não está vazia
    if (password && typeof password === 'string' && password.trim() !== '') {
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;  // Atribuição apenas se for necessário
    }

    // Restante da lógica de atualização
    const response = await pessoajuridicaService.update(
      { name, username, email, password, avatar },
      pessoajuridicaId
    );

    return res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message, details: "Erro no update. controller" });
  }
};




export default {
  create,
  findAll,
  findById,
  update,
};
