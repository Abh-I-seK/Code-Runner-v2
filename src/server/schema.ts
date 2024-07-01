import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const codesTable = pgTable('codes_table', {
    id: serial('id').primaryKey(),
    username : text('name').notNull(),
    srcCode : text('src_code').notNull(),
    stdinp : text('stdinp').notNull(),
    lang : text('lang').notNull(),
    stdout: text('stdout').notNull(),
    status : text('status').notNull(),
    created : timestamp('timestamp').defaultNow()
  });
  
export type InsertCode = typeof codesTable.$inferInsert;
export type SelectCode = typeof codesTable.$inferSelect;