import mongoose from "mongoose"
import userService from "../services/user.service.js";
import pessoajuridicaService from "../services/pessoajuridica.service.js";
import pessoafisicaService from "../services/pessoafisica.service.js";

export const validId = (req, res, next) => {
    try
        {const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({ menssage: "Id não encontrado"});
        }

    next();}catch(err){
        res.status(500).send({menssage: err.menssage})
    }
};

export const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ menssage: "Usuário não encontrado"})
    }
    req.id = id;
    req.user = user;

    next();
};

export const validPessoaFisica = async (req, res, next) => {
    const id = req.params.id;

    const pessoafisica = await pessoafisicaService.findByIdService(id);

    if (!pessoafisica) {
        return res.status(400).send({ menssage: "Pessoa Física não encontrado"})
    }
    req.id = id;
    req.pessoafisica = pessoafisica;

    next();
};

export const validPessoaJuridica = async (req, res, next) => {
    const id = req.params.id;

    const pessoajuridica = await pessoajuridicaService.findByIdService(id);

    if (!pessoajuridica) {
        return res.status(400).send({ menssage: "Pessoa Jurídica não encontrado"})
    }
    req.id = id;
    req.pessoajuridica = pessoajuridica;

        // Preencha os campos da tabela PlanoFree conforme necessário
    //     req.planoFreeData = {
    //     name_pj: pessoajuridica.name,
    //     avatar_pj: pessoajuridica.avatar,
    //     redessociais_pj: pessoajuridica.redessociais,
    //     contatos_pj: pessoajuridica.contatos,
    //     endereco_pj: pessoajuridica.endereco,
    //     // Outros campos de PlanoFree que você deseja preencher
    //   };

    next();
};