import PessoaJuridica from "../models/PessoaJuridica.js";

const findByEmailPessoaJuridicaRepository = (email) => PessoaJuridica.findOne({ email: email });

const createServiceRepository = (body) => PessoaJuridica.create(body);

const findAllServiceRepository = () => PessoaJuridica.find();

const findByIdServiceRepository = (idPessoaJuridica) => PessoaJuridica.findById(idPessoaJuridica);

const updateServiceRepository = (
  id,body
) =>
  PessoaJuridica.findOneAndUpdate(
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
  findByEmailPessoaJuridicaRepository,
};
