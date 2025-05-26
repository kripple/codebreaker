import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as uuid from "uuid";
import { sql, eq, asc, and, desc } from "drizzle-orm";
import { integer, timestamp, pgTable, uuid as uuid$1, uniqueIndex, varchar, index, date, check } from "drizzle-orm/pg-core";
const id = integer().primaryKey().generatedAlwaysAsIdentity();
const options = { withTimezone: true };
const timestamps = {
  created_at: timestamp(options).defaultNow().notNull(),
  updated_at: timestamp(options),
  deleted_at: timestamp(options)
};
const User = pgTable(
  "users",
  {
    id,
    uuid: uuid$1().defaultRandom().unique().notNull(),
    ...timestamps
  },
  (table) => [uniqueIndex("uuid_idx").on(table.uuid)]
);
const AdhocGame = pgTable(
  "adhoc_games",
  {
    id,
    solution: varchar().notNull(),
    user_id: integer().notNull().references(() => User.id),
    ...timestamps
  },
  (table) => [index("adhoc_game_user_idx").on(table.user_id)]
);
const Solution = pgTable(
  "solutions",
  {
    id,
    value: varchar().notNull().unique(),
    date: date().defaultNow().notNull().unique(),
    ...timestamps
  },
  (table) => [uniqueIndex("daily_game_solution_date_idx").on(table.date)]
);
const DailyGame = pgTable(
  "daily_games",
  {
    id,
    user_id: integer().notNull().references(() => User.id),
    solution_id: integer().notNull().references(() => Solution.id),
    ...timestamps
  },
  (table) => [
    index("daily_game_user_idx").on(table.user_id),
    index("daily_game_solution_idx").on(table.solution_id)
  ]
);
const Attempt = pgTable(
  "attempts",
  {
    id,
    value: varchar().notNull(),
    feedback: varchar().notNull(),
    daily_game_id: integer().references(() => DailyGame.id),
    adhoc_game_id: integer().references(() => AdhocGame.id),
    ...timestamps
  },
  (table) => [
    check(
      "game_type",
      sql`
      (${table.daily_game_id} IS NOT NULL AND ${table.adhoc_game_id} IS NULL)
      OR
      (${table.daily_game_id} IS NULL AND ${table.adhoc_game_id} IS NOT NULL)
    `
    ),
    index("daily_game_attempt_idx").on(table.daily_game_id),
    index("adhoc_game_attempt_idx").on(table.adhoc_game_id)
  ]
);
async function getAttempts({
  db,
  game
}) {
  console.info("get attempts");
  const isDailyGame = "solution_id" in game;
  const attempts = await db.select().from(Attempt).where(
    isDailyGame ? eq(Attempt.daily_game_id, game.id) : eq(Attempt.adhoc_game_id, game.id)
  ).orderBy(asc(Attempt.created_at));
  return attempts;
}
const config = {
  maxAttempts: 8,
  solutionLength: 4
};
function lookup(array, lookupKey) {
  const lookup2 = {};
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = item[lookupKey];
    lookup2[key] = item;
  }
  return lookup2;
}
const defaultColor = "gray";
new Array(config.solutionLength).fill(
  defaultColor
);
new Array(config.maxAttempts).fill(defaultColor).map(() => new Array(config.solutionLength).fill(defaultColor));
const icons = [
  "fairy",
  "fire",
  "lightning",
  "grass",
  "ice",
  "water",
  "rock"
];
const gameTokens = icons.map((icon, id2) => {
  const tokenId = id2 + 1;
  return {
    icon,
    color: `var(--token-${tokenId})`,
    id: tokenId
  };
});
const correct = "X";
const feedbackTokenSet = [
  {
    value: "-",
    label: "incorrect color",
    key: "incorrect"
  },
  {
    value: "O",
    label: "correct color, incorrect position",
    key: "halfCorrect"
  },
  {
    value: correct,
    label: "correct color, correct position",
    key: "correct"
  }
];
const feedbackTokens = feedbackTokenSet.map((token, id2) => ({
  ...token,
  id: id2,
  color: `var(--feedback-token-${token.key})`
}));
lookup(feedbackTokens, "value");
new Array(config.solutionLength).fill(correct).join("");
function getRandomInteger(max) {
  const byteArray = new Uint32Array(1);
  crypto.getRandomValues(byteArray);
  return Math.floor(byteArray[0] / (Math.pow(2, 32) - 1) * max);
}
function sample(array) {
  const id2 = getRandomInteger(array.length);
  return array[id2];
}
function makeSecretCode() {
  const ids = gameTokens.map((token) => token.id);
  const selectedTokens = new Array(config.solutionLength).fill(0).map(() => sample(ids));
  return selectedTokens.join("");
}
async function createNewSolution({
  db
}) {
  console.info("create new solution");
  const value = makeSecretCode();
  const solutions = await db.insert(Solution).values({
    value
  }).returning();
  const solution = solutions.pop();
  if (!solution) {
    throw Error("failed to create new solution");
  }
  return solution;
}
async function getSolution({
  db
}) {
  console.info("get daily solution");
  const solutions = await db.select().from(Solution).where(sql`${Solution.date} = CURRENT_DATE`);
  const solution = solutions.pop();
  return solution;
}
async function getOrCreateSolution({
  db
}) {
  const currentSolution = await getSolution({ db });
  if (currentSolution) console.info(`get solution '${currentSolution.id}'`);
  const solution = currentSolution || await createNewSolution({ db });
  if (!currentSolution) console.info(`create new solution '${solution.id}'`);
  return solution;
}
async function createNewDailyGame({
  db,
  user
}) {
  console.info("create new daily solution");
  const solution = await getOrCreateSolution({ db });
  const daily_solutions = await db.insert(DailyGame).values({
    user_id: user.id,
    solution_id: solution.id
  }).returning();
  const daily_solution = daily_solutions.pop();
  if (!daily_solution) {
    throw Error("failed to create new daily solution");
  }
  return daily_solution;
}
async function getDailyGame({
  db,
  user
}) {
  console.info("get daily solution");
  const solution = await getOrCreateSolution({ db });
  const games = await db.select().from(DailyGame).where(
    and(
      eq(DailyGame.user_id, user.id),
      eq(DailyGame.solution_id, solution.id)
    )
  );
  const game = games.pop();
  return game;
}
async function getOrCreateDailyGame({
  db,
  user
}) {
  console.info("get or create daily game");
  const currentGame = await getDailyGame({ db, user });
  if (currentGame) console.info(`get daily game '${currentGame.id}'`);
  const game = currentGame || await createNewDailyGame({ db, user });
  if (!currentGame) console.info(`create new daily game '${game.id}'`);
  return game;
}
async function createNewUser({
  db
}) {
  const users = await db.insert(User).values({}).returning();
  const user = users.pop();
  if (!user) {
    throw Error("failed to create new user");
  }
  return user;
}
async function getUser({
  db,
  uuid: uuid2
}) {
  const users = await db.select().from(User).where(eq(User.uuid, uuid2)).orderBy(desc(User.created_at)).limit(1);
  const user = users.pop();
  return user;
}
async function getGameById({
  db,
  id: id2
}) {
  const currentUser = uuid.validate(id2) ? await getUser({ db, uuid: id2 }) : void 0;
  const user = currentUser || await createNewUser({ db });
  const game = await getOrCreateDailyGame({ db, user });
  const attempts = await getAttempts({ db, game });
  return { user, attempts };
}
function getGame({
  user,
  attempts
}) {
  return {
    id: user.uuid,
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback
    }))
  };
}
async function handler(request) {
  try {
    const sql2 = neon(Netlify.env.get("DATABASE_URL"));
    const db = drizzle({ client: sql2 });
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id2 = parts[2];
    const data = await getGameById({ db, id: id2 });
    const game = getGame(data);
    return new Response(JSON.stringify(game), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Unexpected error in /game/:id", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export {
  handler as default
};
