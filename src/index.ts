import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import express from "express";
import morgan from "morgan";
import { usersTable } from "./db/schema.ts";
const db = drizzle(process.env.DATABASE_URL!);

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.get("/", async (_, res) => {
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  res.json({ users });
});

app.post("/", async (_, res) => {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  res.json({ user });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
