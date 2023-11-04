import pessoajuridicaService from "../services/pessoajuridica.service.js";

//sempre que for consultar algo no bd, é preciso a espera e por isso usa-se async

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, categoria, redessociais, contatos, endereco } = req.body;

    if (!name || !username || !email || !password || !avatar || !categoria || !redessociais || !contatos || !endereco) {
      res
        .status(400)
        .send({ message: "Nem todos os componentes estão preenchidos" });
    }

    const pessoajuridica = await pessoajuridicaService.createService(req.body); //cria o usuário no BD

    if (!pessoajuridica) {
      return res.status(400).send({ message: "Erro creating Pessoa Jurídica" });
    }

    res.status(201).send({
      message: "Perfil Pessoa Juridica criado com sucesso",
      pessoajuridica: {
        id: pessoajuridica._id,
        name,
        username,
        email,
        avatar,
        categoria,
        redessociais,
        contatos,
        endereco,
      },
    });
  } catch (error) {
    //erro de servidor
    res.status(500).send({ message: error.message });
  }
};

//relação assincrona usa-se async

const findAll = async (req, res) => {
  try {
    const pessoajuridicas = await pessoajuridicaService.findAllService();

    if (pessoajuridicas.length === 0) {
      return res.status(400).send({ message: "Nenhuma Pessoa Jurídica cadastrado" });
    }

    res.send(pessoajuridicas);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const pessoajuridica = req.pessoajuridica;

    res.send(pessoajuridica);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, categoria, redessociais, contatos, endereco } = req.body;

    if (!name && !username && !email && !password && !avatar && !categoria && !redessociais && !contatos && !endereco) {
      res
        .status(400)
        .send({
          message: "Necessário pelo menos um campo para realizar o update",
        });
    }

    const { id, pessoajuridica } = req;

    await pessoajuridicaService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      categoria,
      redessociais,
      contatos,
      endereco
    );

    res.send({ message: "Pessoa Jurídica atualizado com sucesso" });
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
