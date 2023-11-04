import PessoaJuridica from "../models/PessoaJuridica.js";

const createService = (body) => PessoaJuridica.create(body);

const findAllService = () => PessoaJuridica.find();

const findByIdService = (id) => PessoaJuridica.findById(id);

const updateService = (id, name, username, email, password, avatar, categoria, redessociais, contatos, endereco) =>
  PessoaJuridica.findOneAndUpdate(
    { _id: id },
    { name, 
      username, 
      email, 
      password, 
      avatar, 
      categoria,
      redessociais, 
      contatos, 
      endereco }
  );

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
