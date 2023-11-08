import dotenv from "dotenv";
import pessoajuridicaService from "../services/pessoajuridica.service.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const autMiddleware = (req, res, next) => {
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

      const pessoajuridica = await pessoajuridicaService.findByIdService(decoded.id);

      //o token deixa de ser válido se o usuário não existir mais
      if (!pessoajuridica || !pessoajuridica.id) {
        return res.status(401).send({ message: "Token inválido" });
      }

      req.userId = pessoajuridica.id;
    //   console.log(decoded);
      return next();
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};
