import PlanoFree from "../models/PlanoFree.js";


export const createService = (body) => PlanoFree.create(body);

//aqui extraimos as informações da tabela PlanoFree, ordenamos com o sort para exibir o primeiro usuário a criar seu plano ao ultimo, colocamos o skip ele soma o limit de exibição, 5 + 5 + 5..., por ultimo povoamos pegando pelo id o restante dos dados do usuário que pertence a esse plano
export const findAllService = (offset, limit) =>
  PlanoFree.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("pessoajuridica");

//conta quantos há nessa function
export const countPlanoFree = () => PlanoFree.countDocuments();

//exibirá a partir do primeiro intem da lista de planosfree
export const topPlanoFreeService = () =>
  PlanoFree.findOne().sort({ _id: -1 }).populate("pessoajuridica");

//pega informações em PlanoFree pelo id e o usuário atrelado a esse id
export const findByIdService = (id) =>
  PlanoFree.findById(id).populate("pessoajuridica");

//fará o filtro por categoria
export const searchByNameService = async (name) => {
  try {
    // Adicionando log de depuração para verificar o valor do parâmetro 'name'
    console.log("Parâmetro 'name' recebido:", name);

    // Realizando a busca utilizando o método find com uma expressão regular
    // no campo "pessoajuridica.name" para correspondência parcial do nome
    const planofree = await PlanoFree.find({
      "pessoajuridica.name": { $regex: `${name || ""}`, $options: "i" },
    })
      .populate("pessoajuridica") // Garantindo que os dados da pessoa jurídica sejam populados
      .exec();

    // Adicionando log de depuração para verificar os resultados da busca
    console.log("Resultados da busca:", planofree);

    return planofree;
  } catch (error) {
    // Adicionando log de depuração para verificar erros, se houverem
    console.error("Erro na função searchByNameService:", error);
    throw error;
  }
};

//busca por id da pessoa juridica e trazer seus estabelecimentos
export const byPessoaJuridicaService = (id) =>
  PlanoFree.find({ pessoajuridica: id })
    .sort({ _id: -1 })
    .populate("pessoajuridica");

//atualização de dados
export const updatePlanoFreeService = (
  id,
  categoria,
  carrossel,
  funcionamento
) =>
  PlanoFree.findOneAndUpdate(
    { _id: id },
    { categoria, carrossel, funcionamento },
  );

export const erasePlanoFreeService = (id) =>
  PlanoFree.findOneAndDelete({ _id: id });

export const likesPlanoFreeService = (idPlanoFree, userId) =>
  PlanoFree.findOneAndUpdate(
    { _id: idPlanoFree, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

export const deletelikesPlanoFreeService = (idPlanoFree, userId) =>
  PlanoFree.findOneAndUpdate(
    { _id: idPlanoFree },
    { $pull: { likes: { userId } } }
  );
