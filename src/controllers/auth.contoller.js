import bcrypt from 'bcrypt'
import {loginService} from '../services/auth.service.js';

const login = async (req, res) =>
{
    const{ email, password } = req.body;

    try{
        const user = await loginService(email); //busca o usuário no servidor pelo email

        //verifica se o usuário ou a senha estão ok
        if (!user) {
            return res.status(404).send({message: "Usuário ou senha incorreto"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(400).send({message: "Usuário ou senha incorreto"})

        }

        res.send("Login OK")
    }catch(err){
        res.status(500).send(err.message);
    }

};

export { login };