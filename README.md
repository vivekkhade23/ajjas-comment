# HIMS Application (React + Node.js Microservices)

This project contains a **Healthcare Information Management System (HIMS)** with:

- A React.js frontend dashboard.
- A Node.js backend split into microservices.
- An API Gateway that routes module APIs to their own service.

## Modules included

- Masters
- OPD
- IPD
- Billing
- Nursing Station
- Lab
- Pharmacy
- Radiology

## Architecture

- `backend/gateway`: API Gateway on `:4000`
- `backend/services/masters`: Masters service on `:4001`
- `backend/services/opd`: OPD service on `:4002`
- `backend/services/ipd`: IPD service on `:4003`
- `backend/services/billing`: Billing service on `:4004`
- `backend/services/nursing-station`: Nursing Station service on `:4005`
- `backend/services/lab`: Lab service on `:4006`
- `backend/services/pharmacy`: Pharmacy service on `:4007`
- `backend/services/radiology`: Radiology service on `:4008`

## Setup

### 1) Frontend environment

```bash
cp .env.example .env
npm install
```

### 2) Backend environment

```bash
cd backend
cp .env.example .env
npm install
```

## Running the system

### Start backend microservices + gateway

```bash
cd backend
npm run start:all
```

### Start React frontend

```bash
npm start
```

Frontend runs on `http://localhost:3000` and consumes API from `REACT_APP_API_BASE_URL` (default `http://localhost:4000`).

## Example APIs

- `GET /api/masters/departments`
- `GET /api/opd/appointments`
- `GET /api/ipd/admissions`
- `GET /api/billing/invoices`
- `GET /api/nursing-station/tasks`
- `GET /api/lab/orders`
- `GET /api/pharmacy/dispense`
- `GET /api/radiology/studies`

## Scripts

Frontend:

- `npm start`
- `npm test`
- `npm run build`

Backend:

- `npm run start:gateway`
- `npm run start:masters`
- `npm run start:opd`
- `npm run start:ipd`
- `npm run start:billing`
- `npm run start:nursing`
- `npm run start:lab`
- `npm run start:pharmacy`
- `npm run start:radiology`
- `npm run start:all`
