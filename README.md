# Blockchain Simulator (Web)

A simple blockchain simulator as a website. Built with Node.js and Express so you can run it locally and deploy it for your BootCamp activity.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). For port 3090: `npm run start:3090`.

## Deploy on Vercel

1. **From Git**: Push your code to GitHub, then go to [vercel.com/new](https://vercel.com/new), import the repo, and deploy (no extra config needed).
2. **From CLI**: Install Vercel CLI (`npm i -g vercel`), run `vercel` in the project folder, and follow the prompts.

Your site will be at `https://your-project.vercel.app`. The homepage is the simulator UI; `/api/chain` and `POST /api/block` are the API.

**Note:** On Vercel the blockchain lives in the serverless function’s memory and can reset when the function goes cold; for a demo activity this is usually fine.

## Deploy elsewhere

- **Render**: New → Web Service → connect repo, build: `npm install`, start: `npm start`.
- **Railway**: New project → Deploy from GitHub → same build/start. Uses `PORT` automatically.
- **Fly.io / Heroku**: `npm install` and `npm start`; they set `PORT` for you.

## What it does

- **Backend**: In-memory blockchain (proof-of-work, SHA-256 hashes). API: `GET /api/chain`, `POST /api/block`, `GET /api/validate`.
- **Frontend**: One page to view the chain, add a block (with text or JSON body), and refresh. Shows validity status.
