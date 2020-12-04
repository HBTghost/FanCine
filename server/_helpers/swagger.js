import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerRouter = express.Router();
const swaggerDocument = YAML.load('./swagger.yaml');

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
