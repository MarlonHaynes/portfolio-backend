# Portfolio Backend — COMP229 Assignment 2

REST API built with Node.js, Express, MongoDB Atlas and the Mongoose ODM. Provides full CRUD
operations for the references, projects, services and users collections consumed by the
portfolio frontend from Assignment 1.

## Tech stack

Node.js · Express · MongoDB Atlas · Mongoose · CORS · Morgan · http-errors · dotenv

## Getting started

```bash
npm install
cp .env.example .env     # then paste your MongoDB Atlas connection string
npm run dev              # nodemon, or `npm start` for plain node
```

The server listens on port 3000 by default. On a successful boot the console prints the
listening port and a confirmation that the `portfolio` database is connected.

### Environment variables

| Variable      | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `MONGODB_URI` | Atlas connection string; database name must be `portfolio`       |
| `PORT`        | Port the Express server binds to (cloud hosts override this)     |

## Project structure

```
portfolio-backend/
├── server.js                 Entry point: env, DB connection, server start
├── app.js                    Express config, middleware, routers, error handler
├── config/db.js              Mongoose connection to MongoDB Atlas
├── models/                   Reference, Project, Service, User schemas
├── controllers/              CRUD logic per resource
└── routes/                   Endpoint definitions per resource
```

## API endpoints

Each resource exposes the same five operations. Replace `:resource` with
`references`, `projects`, `services` or `users`.

| Method | Endpoint             | Action                  |
| ------ | -------------------- | ----------------------- |
| GET    | `/api/:resource`     | Retrieve all records    |
| GET    | `/api/:resource/:id` | Retrieve one by id      |
| POST   | `/api/:resource`     | Create a new record     |
| PUT    | `/api/:resource/:id` | Update a record by id   |
| DELETE | `/api/:resource/:id` | Delete a record by id   |

### Response shapes

Create and get-by-id return the record under `data`, exposing `id` rather than `_id`:

```json
{
  "success": true,
  "message": "Service added successfully.",
  "data": {
    "title": "Web Application Development",
    "description": "Development of your web app using the MERN stack.",
    "id": "69891397597faee30388c455"
  }
}
```

Get-all returns an array under `data`. Update and delete return only `success` and `message`.
Failures return `success: false` with a descriptive message, produced by the global error handler.

## Data models

**Reference** — name, testimonial, position, company
**Project** — title, completion (Date), description, image
**Service** — title, description
**User** — firstname, lastname, email, password, created (Date), updated (Date)

## Deployment

Deployed to Render as a web service: build command `npm install`, start command `npm start`,
with `MONGODB_URI` supplied as an environment variable. The Atlas cluster must allow network
access from `0.0.0.0/0` so the Render instance can connect.

## Author

Marlon Haynes — Centennial College, COMP229 Web Application Development
