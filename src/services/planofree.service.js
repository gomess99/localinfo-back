import PlanoFreeRepositories from "../repositories/planofree.repositories.js";
import PlanoFreeRouter from "../routes/planofree.route.js";

async function createPlanoFreeService(
  { categoria, carrossel, funcionamento },
  pessoajuridicaId
) {
  if (!categoria || !carrossel || !funcionamento)
    throw new Error("Submit all fields for registration");

  const { id } = await PlanoFreeRepositories.createPlanoFreeRepository(
    categoria,
    carrossel,
    funcionamento,
    pessoajuridicaId
  );

  return {
    message: "Post created successfully!",
    planofree: { id, categoria, carrossel, funcionamento },
  };
}

async function findAllPlanoFreeService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const planofree = await PlanoFreeRepositories.findAllPlanoFreeRepository(
    offset,
    limit
  );

  const total = await PlanoFreeRepositories.countPlanoFree();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  planofree.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

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
  };
}

async function topPlanoFreeService() {
  const planofree = await PlanoFreeRouter.topPlanoFreeRepository();

  if (!planofree) throw new Error("There is no registered post");

  return {
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
  };
}

async function searchPlanoFreeService(categoria) {
  const foundPlanoFree = await PlanoFreeRepositories.searchPlanoFreeRepository(
    categoria
  );

  if (foundPlanoFree.length === 0)
    throw new Error("There are no posts with this title");

  return {
    foundPlanoFree: foundPlanoFree.map((planofree) => ({
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
  };
}

async function findPlanoFreeByIdService(id) {
  const planofree = await PlanoFreeRepositories.findPlanoFreeByIdRepository(id);

  if (!planofree) throw new Error("Plano not found");

  return {
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
  };
}

async function findPlanoFreeByUserIdService(id) {
  const planofree = await PlanoFreeRepositories.findPlanoFreeByUserIdRepository(
    id
  );

  return {
    planofreeByUser: planofree.map((planofree) => ({
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
  };
}

async function updatePostService(
  id,
  categoria,
  carrossel,
  funcionamento,
  pessoajuridicaId
) {
  if (!categoria && !carrossel && !funcionamento)
    throw new Error("Submit at least one field to update the post");

  const planofree = await PlanoFreeRepositories.findPlanoFreeByIdRepository(id);

  if (!planofree) throw new Error("Post not found");

  if (planofree.pessoajuridica._id != pessoajuridicaId)
    throw new Error("You didn't create this post");

  await PlanoFreeRepositories.updatePlanoFreeRepository(
    id,
    categoria,
    carrossel,
    funcionamento
  );
}

async function deletePlanoFreeService(id, pessoajuridicaId) {
  const planofree = await PlanoFreeService.findPlanoFreeByIdService(id);

  if (!planofree) throw new Error("Post not found");

  if (planofree.pessoajuridica._id != pessoajuridicaId)
    throw new Error("You didn't create this post");

  await PlanoFreeRepositories.deletePlanoFreeRepository(id);
}

async function likePlanoFreeService(id, pessoajuridicaId) {
  const planofreeLiked = await PlanoFreeService.likesService(
    id,
    pessoajuridicaId
  );

  if (planofreeLiked.lastErrorObject.n === 0) {
    await PlanoFreeService.likesDeleteService(id, pessoajuridicaId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

export default {
  createPlanoFreeService,
  findAllPlanoFreeService,
  topPlanoFreeService,
  searchPlanoFreeService,
  findPlanoFreeByIdService,
  findPlanoFreeByUserIdService,
  updatePostService,
  deletePlanoFreeService,
  likePlanoFreeService,
};
