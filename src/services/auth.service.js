import User from '../models/User.js';

const loginService = (email) => User.findOne({ email: email}).select("+password"); //aqui ele também trás a senha criptografada

export {loginService};
