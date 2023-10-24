import {Router} from "express";
import userController from "../controllers/user.controller.js"
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", userController.create) //cria users
router.get("/", userController.findAll) //busca todo users
router.get("/:id", validId, validUser, userController.findById) //busca users id
router.patch("/:id", validId, validUser, userController.update)

export default router;