# Deployment Guide

## Production Deployment

### Vercel (Frontend)

```bash
cd front
vercel --prod
```

**Live:** https://polka-ticket-ii1x7sid7-hles-projects.vercel.app

### Configuration

- Build command: `npm run build`
- Output directory: `build`
- Install command: `npm install --legacy-peer-deps`

## Environment Setup

Production environment variables:

```env
NODE_VERSION=18
REACT_APP_NAME=Polka Ticket
REACT_APP_VERSION=1.1.0-stable
REACT_APP_USE_MOCK_DATA=true
```

## Polkadot Cloud

Submitted for hosting at: `polka-ticket.polkadot.cloud`

Status: Pending approval
