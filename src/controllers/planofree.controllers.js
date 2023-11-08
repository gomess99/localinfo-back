import { createService, findAllService } from "../services/planofree.service.js";

const create = async (req, res) => {
  try {
    const { carrossel, funcionamento } = req.body;

    if (!carrossel || !funcionamento) {
      return res.status(400).send({
        message: "Preencha todos os campos",
      });
    }

    await createService({
      carrossel,
      funcionamento,
      pessoajuridica: req.userId,
    });

    res.sendStatus(201); // Correção: use res.sendStatus(201) em vez de res.send(201)
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const planofree = await findAllService();
  if (planofree.length === 0) {
    return res.status(400).send({ message: "Nenhum Plano Free encontrado" });
  }
  res.send(planofree);
}

export { create, findAll };
