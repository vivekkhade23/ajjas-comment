const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

const services = {
  masters: process.env.MASTERS_URL || 'http://localhost:4001',
  opd: process.env.OPD_URL || 'http://localhost:4002',
  ipd: process.env.IPD_URL || 'http://localhost:4003',
  billing: process.env.BILLING_URL || 'http://localhost:4004',
  'nursing-station': process.env.NURSING_URL || 'http://localhost:4005',
  lab: process.env.LAB_URL || 'http://localhost:4006',
  pharmacy: process.env.PHARMACY_URL || 'http://localhost:4007',
  radiology: process.env.RADIOLOGY_URL || 'http://localhost:4008'
};

Object.entries(services).forEach(([serviceName, target]) => {
  app.use(`/api/${serviceName}`, createProxyMiddleware({
    target,
    changeOrigin: true
  }));
});

app.get('/health', (_req, res) => {
  res.json({ gateway: 'UP', services });
});

const port = process.env.GATEWAY_PORT || 4000;
app.listen(port, () => {
  console.log(`API gateway listening on ${port}`);
});
