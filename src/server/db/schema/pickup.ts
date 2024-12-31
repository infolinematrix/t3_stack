import { pgTable, uuid, varchar, index } from "drizzle-orm/pg-core";

export const pickup = pgTable(
  "pickup",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).notNull(),
    value: varchar("value", { length: 100 }).notNull(),

    
  },
  (table) => [
    index("idx_code").on(table.code),
    index("idx_value").on(table.value),
  ]
);

//----------------------------------------
