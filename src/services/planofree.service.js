import PlanoFree from "../models/PlanoFree.js";

const createService = (body) => PlanoFree.create(body);

const findAllService = () => PlanoFree.find();

export{
    createService,
    findAllService
}