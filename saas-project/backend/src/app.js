import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import billingRoutes from './routes/billingRoutes.js';

import { requireAuth } from './middleware/auth.js';
import { tenantResolver } from './middleware/validateTenant.js';
import { enforceTenantAccess } from './middleware/tenantScope.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

app.get('/health', (_req, res) => res.json({ success: true, uptime: process.uptime() }));
app.use('/api/auth', authRoutes);

app.use('/api/billing/webhook', express.json({ type: '*/*' }));

app.use('/api', requireAuth, tenantResolver, enforceTenantAccess);

app.use('/api/tenants', tenantRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/billing', billingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
