import {
  createService,
  findAllService,
  countPlanoFree,
  topPlanoFreeService,
  findByIdService,
  searchByNameService,
  byPessoaJuridicaService,
  updatePlanoFreeService,
  erasePlanoFreeService,
  likesPlanoFreeService,
  deletelikesPlanoFreeService,
} from "../services/planofree.service.js";

//cria os planos
export const create = async (req, res) => {
  try {
    const { categoria, carrossel, funcionamento } = req.body;

    if (!categoria || !carrossel || !funcionamento) {
      return res.status(400).send({
        message: "Preencha todos os campos",
      });
    }

    await createService({
      categoria,
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

    const planofree = await findAllService(offset, limit);
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
    
    planofree.shift();

    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: planofree.map((planofree) => ({
        id: planofree._id,
        categoria: planofree.categoria,
        carrossel: planofree.carrossel,
        likes: planofree.likes,
        funcionamento: planofree.funcionamento,
        name: planofree.pessoajuridica.name,
        avatar: planofree.pessoajuridica.avatar,
        redessociais: planofree.pessoajuridica.redessociais,
        contatos: planofree.pessoajuridica.contatos,
        endereco: planofree.pessoajuridica.endereco,
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
        categoria: planofree.categoria,
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
  try {
    const { id } = req.params;
    const planofree = await findByIdService(id);

    return res.send({
      planofree: {
        id: planofree._id,
        categoria: planofree.categoria,
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

export const searchByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Adicione este log para verificar o valor do 'name' antes de realizar a busca
    console.log("Valor do 'name' na busca:", name);

    const planofree = await searchByNameService(name);

    // Adicione este log para verificar os resultados da busca antes de formatar a resposta
    console.log("Resultados da busca:", planofree);

    if (planofree.length === 0) {
      return res.status(400).send({
        message: "Não existe nenhum estabelecimento com essa característica",
      });
    }

    // Formate a resposta conforme necessário antes de enviá-la
    return res.send({
      results: planofree.map((planofree) => ({
        id: planofree._id,
        categoria: planofree.categoria,
        likes: planofree.likes,
        carrossel: planofree.carrossel,
        funcionamento: planofree.funcionamento,
        name: planofree.pessoajuridica.name,
        avatar: planofree.pessoajuridica.avatar,
        redessociais: planofree.pessoajuridica.redessociais,
        contatos: planofree.pessoajuridica.contatos,
        endereco: planofree.pessoajuridica.endereco,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//buscar o plano free de um usuário pelo id, se ouver outros estabelecimentos desse usuário será mostrado também
export const byPessoaJuridica = async (req, res) => {
  try {
    const id = req.userId;
    const planofree = await byPessoaJuridicaService(id);

    return res.send({
      results: planofree.map((planofree) => ({
        id: planofree._id,
        categoria: planofree.categoria,
        likes: planofree.likes,
        carrossel: planofree.carrossel,
        funcionamento: planofree.funcionamento,
        name: planofree.pessoajuridica.name,
        avatar: planofree.pessoajuridica.avatar,
        redessociais: planofree.pessoajuridica.redessociais,
        contatos: planofree.pessoajuridica.contatos,
        endereco: planofree.pessoajuridica.endereco,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//atualização
export const updatePlanoFree = async (req, res) => {
  try {
    const { categoria, carrossel, funcionamento } = req.body;
    const { id } = req.params;

    if (!categoria && !carrossel && !funcionamento) {
      res.status(400).send({
        message: "Escolha um campo para fazer alteração",
      });
    }

    //aqui faz a busca para encontrar se a pessoa que está fazendo a alteração realmente é o proprietário do plano
    const planofree = await findByIdService(id);

    if (String(planofree.pessoajuridica._id) !== req.userId) {
      res.status(400).send({
        message: "Você não pode dá update nesse publicação",
      });
    }

    await updatePlanoFreeService(id, categoria, carrossel, funcionamento);

    return res.send({ message: "Publicação alterada com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erasePlanoFree = async (req, res) => {
  try {
    const { id } = req.params;

    const planofree = await findByIdService(id);

    if (String(planofree.pessoajuridica._id) !== req.userId) {
      return res.status(400).send({
        message: "Você não pode deletar nesse publicação",
      });
    }

    await erasePlanoFreeService(id);
    return res.send({
      message: "Você deletou essa divulgação",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const likesPlanoFree = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const planofreeLiked = await likesPlanoFreeService(id, userId);

    if(!planofreeLiked){
        await deletelikesPlanoFreeService(id, userId);
        return res.status(200).send({message: "Like Removido"});
    }

    return res.status(200).send({message: "Like"});

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
