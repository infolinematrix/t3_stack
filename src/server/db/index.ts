// import { drizzle } from "drizzle-orm/postgres-js";
// // import { schema } from "@/server/db/schema";

// import { env } from "@/env";
// import * as schema from "@/server/db/schema";
// import 'dotenv/config';
// import postgres from "postgres";


// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// const client = drizzle(process.env.DATABASE_URL!, { schema });
// export const db = client;

// // export const db = drizzle(process.env.DATABASE_URL!);

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
// import {schema} from "@/server/db/schema";
import { env } from "@/env";
import schema from "./schema";

const client = new Client({
  connectionString:env.DATABASE_URL
})

await client.connect()

export const db = drizzle(client, {schema: schema})


