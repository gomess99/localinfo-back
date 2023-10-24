import User from "../models/User.js";

const createService = (body) => User.create(body);

//função do mongoose para buscar todos os usuários
const findAllService = () => User.find();

//função do mongoose para busca usuário por ID
const findByIdService = (id) => User.findById(id);

//função do mongoose para atualizar todos os dados do user
const updateService = (id, name, username, email, password, avatar
) =>User.findOneAndUpdate(//busca um parâmetro para atualizar
    { _id: id }, //busca pelo id
    {name, username, email, password, avatar }
  )
    

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
}
