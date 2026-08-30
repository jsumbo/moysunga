import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Pool } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const schemaPath = fileURLToPath(new URL("../db/schema.sql", import.meta.url));
const schemaSql = readFileSync(schemaPath, "utf8");

const pool = new Pool({ connectionString: databaseUrl });

try {
  await pool.query(schemaSql);
  console.log("Migration applied: registrations, partnership_inquiries");
} finally {
  await pool.end();
}
