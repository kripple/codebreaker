# Codebreaker

https://en.wikipedia.org/wiki/Mastermind_(board_game)

## Development

This project uses `NPM Scripts` to execute repeatable tasks.

### Installation & Setup

This project consists of three main parts:

1. React app deployed via GitHub Pages
2. Netlify Edge Functions
3. Postgres DB using NeonDB and Drizzle ORM (codebreaker & codebreaker-dev)

- Install dependencies: `npm install`
- Install browsers for Playwright tests: `npm run setup`
- Run frontend app: `npm start`
- Run Netlify edge functions + frontend app: `npm run api`
- Build frontend app: `npm run build`
- Preview the frontend build: `npm run preview`
- Deploy frontend app - happens automatically for any changes to `/docs` on `main` branch (via GitHub Pages)
- Run unit tests: `npm test`
- Run integration tests: `npm run e2e`
- Linting: `npm run lint`
- To generate new migrations: `npm run generate`
- To run migrations on dev DB: `npm run migrate:dev`
- To run migrations on prod DB: `npm run migrate`
- To build Netlify edge functions: `npm run build:api`
- Authenticate with Netlify to allow deploying via the CLI: `npm run auth`
- To deploy Netlify edge functions: `npm run deploy`
- Update Netlify env variables: `npm run env`
