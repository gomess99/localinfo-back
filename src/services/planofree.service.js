import PlanoFreeRepositories from "../repositories/planofree.repositories.js";
import PlanoFreeRouter from "../routes/planofree.route.js";

async function createPlanoFreeService(
  {
    categoria,
    descricao,
    galeria,
    funcionamento,
    redessociais,
    contatos,
    endereco,
  },
  pessoajuridicaId
) {
  if (
    !categoria ||
    !descricao ||
    !galeria ||
    !funcionamento ||
    !redessociais ||
    !contatos ||
    !endereco
  )
    throw new Error("Submit all fields for registration");

  const { id } = await PlanoFreeRepositories.createPlanoFreeRepository(
    categoria,
    descricao,
    galeria,
    funcionamento,
    redessociais,
    contatos,
    endereco,
    pessoajuridicaId
  );

  return {
    message: "Plano free cadastrado com sucesso!",
    planofree: {
      id,
      categoria,
      descricao,
      galeria,
      funcionamento,
      redessociais,
      contatos,
      endereco,
    },
  };
}

async function findAllPlanoFreeService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 15;
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

  const trimmedPlanofree = planofree.slice(0);

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: trimmedPlanofree.map((planofree) => ({
      id: planofree._id,
      categoria: planofree.categoria,
      likes: planofree.likes,
      galeria: planofree.galeria,
      funcionamento: planofree.funcionamento,
      redessociais: planofree.redessociais,
      contatos: planofree.contatos,
      endereco: planofree.endereco,
      name: planofree.pessoajuridica.name,
      username: planofree.pessoajuridica.username,
      email: planofree.pessoajuridica.email,
      password: planofree.pessoajuridica.password,
      avatar: planofree.pessoajuridica.avatar,
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
      galeria: planofree.galeria,
      funcionamento: planofree.funcionamento,
      redessociais: planofree.redessociais,
      contatos: planofree.contatos,
      endereco: planofree.endereco,
      name: planofree.pessoajuridica.name,
      username: planofree.pessoajuridica.username,
      email: planofree.pessoajuridica.email,
      password: planofree.pessoajuridica.password,
      avatar: planofree.pessoajuridica.avatar,
    },
  };
}

async function searchPlanoFreeService(categoria) {
  const foundPlanoFree = await PlanoFreeRepositories.searchPlanoFreeRepository(
    categoria
  );

  if (foundPlanoFree.length === 0)
    throw new Error("Nenhum resultado para esse busca");

  return {
    foundPlanoFree: foundPlanoFree.map((planofree) => ({
      id: planofree._id,
      categoria: planofree.categoria,
      likes: planofree.likes,
      galeria: planofree.galeria,
      funcionamento: planofree.funcionamento,
      redessociais: planofree.redessociais,
      contatos: planofree.contatos,
      endereco: planofree.endereco,
      name: planofree.pessoajuridica.name,
      username: planofree.pessoajuridica.username,
      email: planofree.pessoajuridica.email,
      password: planofree.pessoajuridica.password,
      avatar: planofree.pessoajuridica.avatar,
    })),
  };
}

async function findPlanoFreeByIdService(id) {
  const planofree = await PlanoFreeRepositories.findPlanoFreeByIdRepository(id);

  if (!planofree) throw new Error("Plano not found");

  return {
    planofreeById: {
      id: planofree._id,
      categoria: planofree.categoria,
      descricao: planofree.descricao,
      likes: planofree.likes,
      galeria: planofree.galeria,
      funcionamento: planofree.funcionamento,
      redessociais: planofree.redessociais,
      contatos: planofree.contatos,
      endereco: planofree.endereco,
      name: planofree.pessoajuridica.name,
      username: planofree.pessoajuridica.username,
      email: planofree.pessoajuridica.email,
      password: planofree.pessoajuridica.password,
      avatar: planofree.pessoajuridica.avatar,
    },
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
      descricao: planofree.descricao,
      likes: planofree.likes,
      galeria: planofree.galeria,
      funcionamento: planofree.funcionamento,
      redessociais: planofree.redessociais,
      contatos: planofree.contatos,
      endereco: planofree.endereco,
      name: planofree.pessoajuridica.name,
      username: planofree.pessoajuridica.username,
      email: planofree.pessoajuridica.email,
      password: planofree.pessoajuridica.password,
      avatar: planofree.pessoajuridica.avatar,
    })),
  };
}

async function updatePostService(
  id,
  categoria,
  descricao,
  galeria,
  funcionamento,
  redessociais,
  contatos,
  endereco,
  pessoajuridicaId
) {
  if (
    !categoria &&
    !descricao &&
    !galeria &&
    !funcionamento &&
    !redessociais &&
    !contatos &&
    !endereco
  )
    throw new Error("Submit at least one field to update the post");

  const planofree = await PlanoFreeRepositories.findPlanoFreeByIdRepository(id);

  if (!planofree) throw new Error("Post not found");

  if (planofree.pessoajuridica._id != pessoajuridicaId)
    throw new Error("You didn't create this post");

  await PlanoFreeRepositories.updatePlanoFreeRepository(
    id,
    categoria,
    descricao,
    galeria,
    funcionamento,
    redessociais,
    contatos,
    endereco
  );
}

async function deletePlanoFreeService(id, pessoajuridicaId) {
  const planofree = await PlanoFreeRepositories.deletePlanoFreeRepository(id);

  if (!planofree) throw new Error("Post not found");

  if (planofree.pessoajuridica._id != pessoajuridicaId)
    throw new Error("You didn't create this post");

  await PlanoFreeRepositories.deletePlanoFreeRepository(id);
}

async function likePlanoFreeService(id, pessoajuridicaId) {
  const planofreeLiked = await PlanoFreeRepositories.likesRepository(
    id,
    pessoajuridicaId
  );

  if (planofreeLiked.lastErrorObject.n === 0) {
    await PlanoFreeRepositories.likesDeleteRepository(id, pessoajuridicaId);
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
