import PessoaFisica from "../models/PessoaFisica.js";

const createService = (body) => PessoaFisica.create(body);

//função do mongoose para buscar todos os usuários
const findAllService = () => PessoaFisica.find();

//função do mongoose para busca usuário por ID
const findByIdService = (id) => PessoaFisica.findById(id);

//função do mongoose para atualizar todos os dados do user
const updateService = (id, name, username, email, password, avatar
) =>PessoaFisica.findOneAndUpdate(//busca um parâmetro para atualizar
    { _id: id }, //busca pelo id
    {name, username, email, password, avatar }
  )
    

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
}
