const express = require('express');
const cors = require('cors');

function createService({ serviceName, port, routes }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ service: serviceName, status: 'UP', port });
  });

  routes.forEach((route) => {
    app[route.method](route.path, (_req, res) => {
      res.json({ service: serviceName, ...route.handler() });
    });
  });

  app.listen(port, () => {
    console.log(`${serviceName} service listening on ${port}`);
  });
}

module.exports = { createService };
