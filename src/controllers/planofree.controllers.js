import PlanoFreeService from "../services/planofree.service.js";

async function createPlanoFreeController(req, res) {
  const { categoria, descricao, galeria, funcionamento, redessociais, contatos, endereco } = req.body;
  const pessoajuridicaId = req.pessoajuridicaId;

  try {
    const planofree = await PlanoFreeService.createPlanoFreeService(
      { categoria, descricao, galeria, funcionamento, redessociais, contatos, endereco },
      pessoajuridicaId
    );
    return res.status(201).send(planofree);
  } catch (e) {
    console.error("Error creating plano:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function findAllPlanoFreeController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const planofree = await PlanoFreeService.findAllPlanoFreeService(
      limit,
      offset,
      currentUrl
    );
    return res.send(planofree);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topPlanoFreeController(req, res) {
  try {
    const planofree = await PlanoFreeService.topPlanoFreeService();
    return res.send(planofree);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchPlanoFreeController(req, res) {
  const { categoria } = req.query;

  try {
    const foundPlanoFree = await PlanoFreeService.searchPlanoFreeService(categoria);

    return res.send(foundPlanoFree);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findPlanoFreeByIdController(req, res) {
  const { id } = req.params;

  try {
    const planofree = await PlanoFreeService.findPlanoFreeByIdService(id);
    return res.send(planofree);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findPlanoFreeByUserIdController(req, res) {
  const id = req.pessoajuridicaId;
  try {
    const planofree = await PlanoFreeService.findPlanoFreeByUserIdService(id);
    return res.send(planofree);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updatePlanoFreeController(req, res) {
  const { categoria, descricao, galeria, funcionamento, redessociais, contatos, endereco } = req.body;
  const { id } = req.params;
  const pessoajuridicaId = req.pessoajuridicaId;

  try {
    await postService.updatePostService(id, categoria, descricao, galeria, funcionamento, redessociais, contatos, endereco, pessoajuridicaId);

    return res.send({ message: "Post successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deletePlanoFreeController(req, res) {
  const { id } = req.params;
  const pessoajuridicaId = req.pessoajuridicaId;

  try {
    await PlanoFreeService.deletePlanoFreeService(id, pessoajuridicaId);
    return res.send({ message: "Post deleted successfully" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function likePlanoFreeController(req, res) {
  const { id } = req.params;
  const pessoajuridicaId = req.pessoajuridicaId;

  try {
    const response = await PlanoFreeService.likePlanoFreeService(id, pessoajuridicaId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}


export default {
  createPlanoFreeController,
  findAllPlanoFreeController,
  topPlanoFreeController,
  searchPlanoFreeController,
  findPlanoFreeByIdController,
  findPlanoFreeByUserIdController,
  updatePlanoFreeController,
  deletePlanoFreeController,
  likePlanoFreeController,
};