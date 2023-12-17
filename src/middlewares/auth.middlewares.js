import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";
import pessoafisicarepositories from "../repositories/pessoafisicarepositories.js";

dotenv.config();

const autMiddlewarePessoaJuridica = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).send({ message: "The token was not informed!" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
      return res.status(401).send({ message: "Invalid token!!" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ message: "Malformatted Token!" });

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoajuridica =
        await pessoajuridicarepositories.findByIdServiceRepository(decoded.id);

      if (!pessoajuridica || !pessoajuridica.id) {
        return res
          .status(401)
          .send({
            message: "Token inválido, id não condigente com a pessoa jurídica",
          });
      }

      req.pessoajuridicaId = pessoajuridica.id;
      return next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const authMiddlewarePessoaFisica = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).send({ message: "O token não foi informado!" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
      return res.status(401).send({ message: "Token inválido!" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ message: "Token mal formatado!" });

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoafisica =
        await pessoafisicarepositories.findByIdServiceRepository(decoded.id);

      if (!pessoafisica || !pessoafisica.id) {
        return res
          .status(401)
          .send({
            message: "Token inválido, id não condizente com a pessoa física",
          });
      }

      req.pessoafisicaId = pessoafisica.id;
      return next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
};



export { autMiddlewarePessoaJuridica, authMiddlewarePessoaFisica };
