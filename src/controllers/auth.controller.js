import authService from "../services/auth.service.js"

const loginPessoaJuridica = async (req, res) =>
{
    const{ email, password } = req.body;

    try{
        const token = await authService.loginServicePessoaJuridica({ email, password });

        return res.send(token);
    }catch(e){
        console.log(e);
        return res.status(401).send(e.message);
    }

};

const loginPessoaFisica = async (req, res) =>
{
    const{ email, password } = req.body;

    try{
        const token = await authService.loginServicePessoaFisica({ email, password });

        return res.send(token);
    }catch(e){
        return res.status(401).send(e.message);
    }

};


export default { loginPessoaJuridica, loginPessoaFisica };