import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const genders = ["female", "male"] as const;
export type Gender = (typeof genders)[number];
export const genderEnum = pgEnum("gender", genders);

export const households = pgTable("households", {
  // Random, non-guessable token used in the invite URL.
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const guests = pgTable("guests", {
  id: serial("id").primaryKey(),
  householdId: text("household_id")
    .notNull()
    .references(() => households.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  // Used for the German salutation ("Liebe Lena, lieber Max").
  gender: genderEnum("gender").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// One row per household; overwritten when the answer changes.
export const rsvps = pgTable("rsvps", {
  householdId: text("household_id")
    .primaryKey()
    .references(() => households.id, { onDelete: "cascade" }),
  attending: boolean("attending").notNull(),
  message: text("message"),
  respondedAt: timestamp("responded_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
