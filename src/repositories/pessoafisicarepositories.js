import PessoaFisica from "../models/PessoaFisica.js";

const findByEmailPessoaFisicaRepository = (email) =>
  PessoaFisica.findOne({ email: email }).select("+password");

const createServiceRepository = (body) => PessoaFisica.create(body);

const findAllServiceRepository = () => PessoaFisica.find();

const findByIdServiceRepository = (idPessoaFisica) =>
  PessoaFisica.findById(idPessoaFisica);

const updateServiceRepository = (id, body) =>
  PessoaFisica.findOneAndUpdate(
    { _id: id },
    {
      body,
    },
    {
      rawResult: true,
    }
  );

export default {
  createServiceRepository,
  findAllServiceRepository,
  findByIdServiceRepository,
  updateServiceRepository,
  findByEmailPessoaFisicaRepository,
};
