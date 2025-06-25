require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
const app = express();
const logger = require('./src/utils/logger');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import email module
const emailRoutes = require('./src/email/email.routes');
app.use('/api/email', emailRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Diyemedim API is running!');
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});