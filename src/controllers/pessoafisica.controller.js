import pessoafisicaService from "../services/pessoafisica.service.js";

const create = async (req, res) => {
  const body = req.body;

  try {
    const token = await pessoafisicaService.create(body); // Cria o usuário no BD

    return res.status(201).send(token);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const findAll = async (req, res) => {
  try {
    const pessoafisica = await pessoafisicaService.findAll(); // Obtém todos os usuários no BD

    return res.send(pessoafisica);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const findById = async (req, res) => {
  try {
    const pessoafisica = await pessoafisicaService.findById(
      req.params.id,
      req.pessoafisicaId
    );

    return res.send(pessoafisica);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const update = async (req, res) => {
  const body = req.body;
  const pessoafisicaId = req.pessoafisicaId;

  try {
    const response = await pessoafisicaService.update(body, pessoafisicaId);

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
