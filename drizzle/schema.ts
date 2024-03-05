import {
  datetime,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm/relations';

// Users table.
export const users = mysqlTable('user', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .notNull(),
  displayName: varchar('display_name', { length: 47 }).notNull(),
  username: varchar('username', {
    length: 31,
  }).notNull(),
  passwordHash: varchar('hashed_password', {
    length: 255,
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// Sessions table, used by Lucia auth.
export const sessions = mysqlTable('session', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .notNull(),
  userId: varchar('user_id', {
    length: 255,
  }).notNull(),
  expiresAt: datetime('expires_at').notNull(),
});

//
// PlanetScale foreign key constraints.
//

// Sessions relationship with user id's.

export const usersSessions = relations(users, ({ one }) => ({
  sessions: one(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
