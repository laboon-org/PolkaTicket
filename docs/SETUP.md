# Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Polkadot.js Extension

## Frontend Setup

```bash
cd front
npm install --legacy-peer-deps
npm start
```

## Backend Setup

```bash
cd back/api
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Frontend
REACT_APP_NAME=Polka Ticket
REACT_APP_USE_MOCK_DATA=true

# Backend
DATABASE_URL=postgresql://...
HASURA_ADMIN_SECRET=...
```

## Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Hasura: http://localhost:8080

## Deployment

See `docs/DEPLOYMENT.md` for production deployment instructions.
