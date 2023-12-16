import PlanoFree from "../models/PlanoFree.js";

function createPlanoFreeRepository(
  categoria,
  descricao,
  galeria,
  funcionamento,
  redessociais,
  contatos,
  endereco,
  pessoajuridicaId
) {
  return PlanoFree.create({
    categoria,
    descricao,
    galeria,
    funcionamento,
    redessociais,
    contatos,
    endereco,
    pessoajuridica: pessoajuridicaId,
  });
}

function findAllPlanoFreeRepository(offset, limit) {
  return PlanoFree.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("pessoajuridica");
}

function topPlanoFreeRepository() {
  return PlanoFree.findOne().sort({ _id: -1 }).populate("pessoajuridica");
}

function findPlanoFreeByIdRepository(id) {
  return PlanoFree.findById(id).populate("pessoajuridica");
}

function countPlanoFree() {
  return PlanoFree.countDocuments();
}

function searchPlanoFreeRepository(categoria) {
  return PlanoFree.find({
    categoria: { $regex: `${categoria || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("pessoajuridica");
}

function findPlanoFreeByUserIdRepository(id) {
  return PlanoFree.find({
    pessoajuridica: id,
  })
    .sort({ _id: -1 })
    .populate("pessoajuridica");
}

function updatePlanoFreeRepository(
  id,
  categoria,
  descricao,
  galeria,
  funcionamento,
  redessociais,
  contatos,
  endereco
) {
  return PlanoFree.findOneAndUpdate(
    {
      _id: id,
    },
    {
      categoria,
      descricao,
      galeria,
      funcionamento,
      redessociais,
      contatos,
      endereco,
    },
    {
      rawResult: true,
    }
  );
}

function deletePlanoFreeRepository(id) {
  return PlanoFree.findOneAndDelete({ _id: id });
}

function likesRepository(id, pessoajuridicaId) {
  return PlanoFree.findOneAndUpdate(
    {
      _id: id,
      "likes.pessoajuridicaId": { $nin: [pessoajuridicaId] },
    },
    {
      $push: {
        likes: { pessoajuridicaId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDeleteRepository(id, pessoajuridicaId) {
  return PlanoFree.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          pessoajuridicaId: pessoajuridicaId,
        },
      },
    }
  );
}

export default {
  createPlanoFreeRepository,
  findAllPlanoFreeRepository,
  topPlanoFreeRepository,
  findPlanoFreeByIdRepository,
  searchPlanoFreeRepository,
  findPlanoFreeByUserIdRepository,
  updatePlanoFreeRepository,
  deletePlanoFreeRepository,
  likesRepository,
  likesDeleteRepository,
  countPlanoFree,
};
