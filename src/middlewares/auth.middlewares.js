import dotenv from "dotenv";
import pessoafisicaService from "../services/pessoajuridica.service.js";
import jwt from "jsonwebtoken";
import pessoajuridicarepositories from "../repositories/pessoajuridicarepositories.js";

dotenv.config();

const autMiddlewarePessoaJuridica = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ message: "The token was not informed!" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return res.status(401).send({ message: "Invalid token!" });

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) return res.status(401).send({ message: "Malformatted Token!" });

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoajuridica = await pessoajuridicarepositories.findByIdServiceRepository(decoded.id);

      if (!pessoajuridica || !pessoajuridica.id) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = pessoajuridica.id;
      return next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const autMiddlewarePessoaFisica = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "The token was not informed!" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(401).send({ message: "Malformatted Token!" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const pessoafisica = await pessoafisicaService.findByIdService(decoded.id);

      if (!pessoafisica || !pessoafisica.id) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = pessoafisica.id;
      return next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { autMiddlewarePessoaJuridica, autMiddlewarePessoaFisica };
