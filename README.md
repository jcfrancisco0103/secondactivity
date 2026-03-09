# Blockchain Simulator (Web)

A simple blockchain simulator as a website. Built with Node.js and Express so you can run it locally and deploy it for your BootCamp activity.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The page shows the chain, lets you add blocks (text or JSON), and validates the chain.

## Deploy

- **Render**: New → Web Service → connect repo, build: `npm install`, start: `npm start`. Set root directory to this folder if needed.
- **Railway**: New project → Deploy from GitHub → same build/start. It uses `PORT` automatically.
- **Vercel**: Use a Node server; point to `server.js` or add a `vercel.json` with a serverless config (or keep Render/Railway for a single long-running server).
- **Fly.io / Heroku**: Same idea: `npm install` and `npm start`; they provide `PORT`.

The app reads `process.env.PORT`, so any host that sets `PORT` will work.

## What it does

- **Backend**: In-memory blockchain (proof-of-work, SHA-256 hashes). API: `GET /api/chain`, `POST /api/block`, `GET /api/validate`.
- **Frontend**: One page to view the chain, add a block (with text or JSON body), and refresh. Shows validity status.
