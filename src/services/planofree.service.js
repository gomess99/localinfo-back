import PlanoFree from "../models/PlanoFree.js";

const createService = (body) => PlanoFree.create(body);

//aqui extraimos as informações da tabela PlanoFree, ordenamos com o sort para exibir o primeiro usuário a criar seu plano ao ultimo, colocamos o skip ele soma o limit de exibição, 5 + 5 + 5..., por ultimo povoamos pegando pelo id o restante dos dados do usuário que pertence a esse plano
const findAllService = (offset, limit) => PlanoFree.find().sort({_id: -1}).skip(offset).limit(limit).populate("pessoajuridica");

//conta quantos há nessa function
const countPlanoFree = () => PlanoFree.countDocuments();

//exibirá a partir do primeiro intem da lista de planosfree
const topPlanoFreeService = () => PlanoFree.findOne().sort({_id: -1}).populate("pessoajuridica");

export{
    createService,
    findAllService,
    countPlanoFree,
    topPlanoFreeService
}