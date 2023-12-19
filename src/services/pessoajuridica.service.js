  import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";
  import authService from "../services/auth.service.js";

  import bcrypt from "bcrypt";

  //sempre que for consultar algo no bd, é preciso a espera e por isso usa-se async

  const create = async (body) => {
    const { name, username, email, password, avatar } = body;
    if (!name || !username || !email || !password || !avatar)
      throw new Error("Nem todos os componentes estão preenchidos");

    const foundPessoaJuridica =
      await pessoajuridicarepositories.findByEmailPessoaJuridicaRepository(email);
    if (foundPessoaJuridica) throw new Error("Perfil Jurídico existente");

    const pessoajuridica =
      await pessoajuridicarepositories.createServiceRepository(body); //cria o usuário no BD
    if (!pessoajuridica) throw new Error("Erro ao criar pessoa juridica");

    const token = authService.generateToken(pessoajuridica.id);

    return token;
  };

  //relação assincrona usa-se async

  const findAll = async () => {
    const pessoajuridicas =
      await pessoajuridicarepositories.findAllServiceRepository();

    if (pessoajuridicas.length === 0)
      throw new Error("Nenhuma Pessoa Jurídica cadastrado");

    return pessoajuridicas;
  };

  async function findById(pessoajuridicaIdParam, pessoajuridicaIdLogged) {
    let idParam;
    if (!pessoajuridicaIdParam) {
      pessoajuridicaIdParam = pessoajuridicaIdLogged;
      idParam = pessoajuridicaIdParam;
    } else {
      idParam = pessoajuridicaIdParam;
    }
    if (!idParam)
      throw new Error("Use um ID para encontrar o perfil da pessoa Juridica");
    const pessoajuridica =
      await pessoajuridicarepositories.findByIdServiceRepository(idParam);

    if (!pessoajuridica) throw new Error("Pessoa Jurídica not found");

    return pessoajuridica;
  }

  const update = async (body, pessoajuridicaId) => {
    const { name, username, email, password, avatar } = body;
    if (!name && !username && !email && !password && !avatar)
      throw new Error("Necessário pelo menos um campo para realizar o update");

    const pessoajuridica =
      await pessoajuridicarepositories.findByIdServiceRepository(
        pessoajuridicaId
      );

    if (pessoajuridica._id != pessoajuridicaId)
      new Error("Você não pode dá update com esse usuário");

    if (password) password = await bcrypt.hash(password, 10);

    await pessoajuridicarepositories.updateServiceRepository(
      pessoajuridicaId,
      body
    );

    return { message: "Pessoa Jurídica atualizado com sucesso" };
  };

  export default {
    create,
    findAll,
    findById,
    update,
  };
