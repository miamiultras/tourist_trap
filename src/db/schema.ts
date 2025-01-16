import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const touristTraps = pgTable('tourist_traps', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    location: text('location').notNull(),
    description: text('description'),
    trapCount: integer('trap_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});