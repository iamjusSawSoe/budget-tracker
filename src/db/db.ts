import { drizzle } from "drizzle-orm/postgres-js";
import process from "node:process";
import postgres from "postgres";

export const db = drizzle(postgres(process.env.DATABASE_URL!));
