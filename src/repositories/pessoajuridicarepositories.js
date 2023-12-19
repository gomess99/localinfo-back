import PessoaJuridica from "../models/PessoaJuridica.js";

const findByEmailPessoaJuridicaRepository = (email) => PessoaJuridica.findOne({ email: email }).select("+password");

const createServiceRepository = (body) => PessoaJuridica.create(body);

const findAllServiceRepository = () => PessoaJuridica.find();

const findByIdServiceRepository = (idPessoaJuridica) => PessoaJuridica.findById(idPessoaJuridica);

const updateServiceRepository = async (id, { name, username, email, password, avatar }) => {
  return PessoaJuridica.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar },
    { rawResult: true }
  );
};


export default {
  createServiceRepository,
  findAllServiceRepository,
  findByIdServiceRepository,
  updateServiceRepository,
  findByEmailPessoaJuridicaRepository,
};
