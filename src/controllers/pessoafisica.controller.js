import PessoaFisicaService from "../services/pessoafisica.service.js";

// Sempre que for consultar algo no BD, é preciso a espera e por isso usa-se async

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar} = req.body;

    if (!name || !username || !email || !password || !avatar ) {
      res.status(400).send({ message: "Nem todos os componentes estão preenchidos" });
    }

    const pessoafisica = await PessoaFisicaService.createService(req.body); // Cria o usuário no BD

    if (!pessoafisica) {
      return res.status(400).send({ message: "Erro ao criar Pessoa Física" });
    }

    res.status(201).send({
      message: "Perfil Pessoa Física criado com sucesso",
      pessoafisica: {
        id: pessoafisica._id,
        name,
        username,
        email,
        avatar
      },
    });
  } catch (error) {
    // Erro de servidor
    res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const pessoafisicas = await PessoaFisicaService.findAllService();

    if (pessoafisicas.length === 0) {
      return res.status(400).send({ message: "Nenhuma Pessoa Física cadastrada" });
    }

    res.send(pessoafisicas);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const pessoafisica = req.pessoafisica;

    res.send(pessoafisica);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar} = req.body;

    if (!name && !username && !email && !password && !avatar ) {
      res.status(400).send({ message: "Necessário pelo menos um campo para realizar o update" });
    }

    const { id, pessoafisica } = req;

    await PessoaFisicaService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar
    );

    res.send({ message: "Pessoa Física atualizada com sucesso" });
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
