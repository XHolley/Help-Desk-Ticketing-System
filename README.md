# Help Desk Ticketing System

A full-stack ticket management application built with Vue 3, Node.js, and Express. The project simulates a real internal support workflow where employees submit issues and support teams track, prioritize, assign, and resolve tickets.

This repository is designed as a portfolio project for junior software engineering, IT support, QA, and analyst roles.

## Tech stack

- Vue 3
- Vue Router
- Vite
- Node.js
- Express
- Axios
- REST API design

## Features

- Ticket dashboard with live search, status filtering, and priority filtering
- New ticket creation flow
- Ticket assignment, unassignment, close, and reopen actions
- Ticket detail data model with priority, category, requester, assignee, and status
- Role-aware authentication mock routes for portfolio discussion
- Health check endpoint for backend monitoring
- Backend request validation for ticket create and update flows
- Clean separation between frontend, backend, and supporting docs

## Project structure

- `frontend/` Vue single-page application
- `backend/` Express API
- `docs/` resume bullets and interview talking points

## Run locally

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API runs on `http://localhost:4000`.

### 2. Start the frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The Vite app runs on `http://localhost:5173`.

## Environment variables

The frontend reads its API base URL from `VITE_API_BASE_URL`.

Example:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

If no environment variable is provided, the frontend defaults to `http://localhost:4000/api`.

## API overview

### Health check

- `GET /api/health`

### Auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Ticket routes

- `GET /api/tickets`
- `GET /api/tickets/:id`
- `POST /api/tickets`
- `PUT /api/tickets/:id`

Supported query params for `GET /api/tickets`:

- `status`
- `priority`
- `search`

Validation rules include:

- required `title`, `description`, `category`, `priority`, and `requester` on ticket creation
- allowed values for status, priority, and category
- optional `assignedTo` as either a string or `null`

## Deployment notes

### Frontend

The frontend can be deployed to Vercel or Netlify.

Before deploying, set:

```bash
VITE_API_BASE_URL=https://your-backend-url/api
```

### Backend

The backend can be deployed to Render, Railway, or another Node-compatible host.

Set:

```bash
PORT=4000
```

In production, the platform usually provides `PORT` automatically.

## Resume value

This project demonstrates:

- Frontend and backend integration
- RESTful API structure
- CRUD workflows
- Filtering and search behavior
- Validation and error-state handling
- Ticket lifecycle actions from the UI
- Environment-based configuration
- Documentation for recruiters and interview conversations

## Interview summary

Built a full-stack help desk ticketing system using Vue 3 and Express to model real support operations. Implemented ticket creation, search, filtering, and update flows, structured the frontend and API as separate applications, and documented the project in a way that makes the business value and technical decisions easy to explain in interviews.

## Recommended GitHub topics

Add these topics on the repository page:

- `vue`
- `vue3`
- `vite`
- `nodejs`
- `express`
- `javascript`
- `rest-api`
- `help-desk`
- `ticketing-system`
- `portfolio-project`
