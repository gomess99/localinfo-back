const SwaggerRoute = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");


SwaggerRoute.use("/", swaggerUi.serve);
SwaggerRoute.get("/", swaggerUi.setup(swaggerDocument));

module.exports = SwaggerRoute;