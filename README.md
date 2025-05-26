# Codebreaker

https://en.wikipedia.org/wiki/Mastermind_(board_game)

## Goals

- Accessibility - uses both colors and patterns/textures to differentiate between tokens
- Idea - daily play game (same solution for everyone, changes at the witching hour (3:33, obviously))
- Answer is a secret to the client, use Symmetric Encryption with Server-Held Secret
- CI/CD pipeline
- Use open source component library
- configurable colors & patterns for game tokens
- entire game state represented as string

## Game Parts

- Game Board
- Secret Code (row of four)
- Game Token
  - Code Token
  - Key Token
- twelve (or ten, or eight, or six) additional rows for guesses - we're going to use 10 as default

- codemaker vs. codebreaker

- correct color + correct position (black)
- correct color + incorrect position (white)

## Development

This project uses `NPM Scripts` to execute repeatable tasks.

### Installation & Setup

- Install dependencies: `npm install`
- Install browsers for Playwright tests: `npm run setup`

- Setup Postgres - https://orm.drizzle.team/docs/guides/postgresql-local-setup

Create rebootable database instance: `docker run --name cbk-postgres -e POSTGRES_PASSWORD=supersecure -d -p 5432:5432 postgres`

Connection URL: `postgres://postgres:supersecure@localhost:5432/postgres`

For testing changes in development: `npx drizzle-kit push`

Generating migrations:
`npx drizzle-kit generate --help`

# DATABASE_URL=postgres://postgres:supersecure@localhost:5432/postgres

`npx drizzle-kit generate --config config/drizzle.config.ts`

`npx drizzle-kit migrate --config config/drizzle.config.ts`

TODO:

- check queries for optimization opportunities (ex. column indexes, table joins)
- use `eq` instead of `sql` where possible

\*\*\* start with unit & integration tests for all of the api/db code

### Local Development

- Serve the fastify api: `npm run serve`
- Serve the react app: `npm start`

### Build & Preview

- Create a production build for the react app: `npm run build`
- Preview the build: `npm run preview`

### Developer Tools

- Run test suites: `npm test`. Testing uses `Playwright`. Test files are co-located with the code they test.
- Run linting: `npm run lint`. Linting is performed using `Prettier` and `ESLint` for code quality and consistency.
- Open most recent HTML test report (api tests only): `npm run test:report`
