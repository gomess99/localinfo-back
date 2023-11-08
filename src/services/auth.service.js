import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import PessoaFisica from '../models/PessoaFisica.js';

import PessoaJuridica from '../models/PessoaJuridica.js';

const loginService = (email) => PessoaJuridica.findOne({ email: email}).select("+password"); //aqui ele também trás a senha criptografada

//guarda a sessão do usuário, saber qual usuário está logado

//ele vai criptografar alfum dado do usuário que estiver na função - playload

//será a chave secreta que decodificará esse token, será usado a criptografica md5  - secreteOrPrivateKey

//foi usado o "expiresIn" ele coloca um tempo de expiração do token, em segudos - options
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});
//tempo para expirar de 24h

export {loginService, generateToken};
