import dotenv from "dotenv";
import pessoafisicaService from "../services/pessoajuridica.service.js";
import jwt from "jsonwebtoken";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";

dotenv.config();

function autMiddlewarePessoaJuridica (req, res, next){
    const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: "The token was not informed!" });

    const parts = authHeader.split(" "); /* ["Bearer", "asdasdasdadsadasd"] */
  if (parts.length !== 2)
    return res.status(401).send({ message: "Invalid token!" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "Malformatted Token!" });

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoajuridica = await pessoajuridicarepositories.findByIdServiceRepository(
        decoded.id
      );

      //o token deixa de ser válido se o usuário não existir mais
      if (!pessoajuridica || !pessoajuridica.id) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = pessoajuridica.id;
      //   console.log(decoded);
      return next();
    });
};

export const autMiddlewarePessoaFisica = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoafisica = await pessoafisicaService.findByIdService(
        decoded.id
      );

      //o token deixa de ser válido se o usuário não existir mais
      if (!pessoafisica || !pessoafisica.id) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = pessoafisica.id;
      //   console.log(decoded);
      return next();
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { autMiddlewarePessoaJuridica };
