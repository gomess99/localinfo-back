import {
  createService,
  findAllService,
  countPlanoFree,
  topPlanoFreeService,
  findByIdService,
} from "../services/planofree.service.js";

//cria os planos
export const create = async (req, res) => {
  try {
    const { carrossel, funcionamento } = req.body;

    if (!carrossel || !funcionamento) {
      return res.status(400).send({
        message: "Preencha todos os campos",
      });
    }

    await createService({
      carrossel,
      funcionamento,
      pessoajuridica: req.userId,
    });

    res.sendStatus(201); // Correção: use res.sendStatus(201) em vez de res.send(201)
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//exibe todos os planos
export const findAll = async (req, res) => {
  try {
    //paginação de dados, exibição de conteúdo aula #21
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    //caso não tenha limit e offset, será lançado esses valores respectivamente
    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const pessoajuridica = await findAllService(offset, limit);
    const total = await countPlanoFree();
    const currentUrl = req.baseUrl;

    //paginação para trazer mais informações para o usuário

    const next = offset + limit;

    //toda vez que fizer uma requisição ele mudará a url constantemente, trazendo novos dados para o usuário
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    const planofree = await findAllService();
    if (planofree.length === 0) {
      return res.status(400).send({ message: "Nenhum Plano Free encontrado" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: pessoajuridica.map((item) => ({
        id: item._id,
        likes: item.likes,
        carrossel: item.carrossel,
        funcionamento: item.funcionamento,
        name: item.pessoajuridica.name,
        avatar: item.pessoajuridica.avatar,
        redessociais: item.pessoajuridica.redessociais,
        contatos: item.pessoajuridica.contatos,
        endereco: item.pessoajuridica.endereco,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//exibe a lista de planos free existentes
export const topPlanoFree = async (req, res) => {
  try {
    const planofree = await topPlanoFreeService();

    if (!planofree) {
      return res
        .status(400)
        .send({ message: "Não há registro de planos free" });
    }

    res.send({
      planofree: {
        id: planofree._id,
        likes: planofree.likes,
        carrossel: planofree.carrossel,
        funcionamento: planofree.funcionamento,
        name: planofree.pessoajuridica.name,
        avatar: planofree.pessoajuridica.avatar,
        redessociais: planofree.pessoajuridica.redessociais,
        contatos: planofree.pessoajuridica.contatos,
        endereco: planofree.pessoajuridica.endereco,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//exibe a lista de planos free existentes pelo id
export const findById = async (req, res) => {
    try{
        const { id } = req.params;
        const planofree = await findByIdService(id);
        
        return res.send({
            planofree: {
                id: planofree._id,
                likes: planofree.likes,
                carrossel: planofree.carrossel,
                funcionamento: planofree.funcionamento,
                name: planofree.pessoajuridica.name,
                avatar: planofree.pessoajuridica.avatar,
                redessociais: planofree.pessoajuridica.redessociais,
                contatos: planofree.pessoajuridica.contatos,
                endereco: planofree.pessoajuridica.endereco,
            },

        })
    } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

