import {
  createService,
  findAllService,
  countPlanoFree,
} from "../services/planofree.service.js";

const create = async (req, res) => {
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

const findAll = async (req, res) => {
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
   previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;



  const planofree = await findAllService();
  if (planofree.length === 0) {
    return res.status(400).send({ message: "Nenhum Plano Free encontrado" });
  }
  res.send({
    nextUrl, previousUrl, limit, offset, total,
    results: pessoajuridica.map(item => ({
        id: item._id,
        likes: item.likes,
        carrossel: item.carrossel,
        funcionamento: item.funcionamento,
        name: item.pessoajuridica.name,
        avatar: item.pessoajuridica.avatar,
        redessociais: item.pessoajuridica.redessociais,
        contatos: item.pessoajuridica.contatos,
        endereco: item.pessoajuridica.endereco,
    }))
  });
};

export { create, findAll };
