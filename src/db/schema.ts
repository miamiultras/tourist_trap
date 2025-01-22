import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const touristTraps = pgTable('tourist_traps_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    location: text('location').notNull(),
    description: text('description'),
    trapCount: integer('trap_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    imageSrc: text('image_src').notNull(),
});

export type TouristTrap = typeof touristTraps.$inferSelect;
export type NewTouristTrap = typeof touristTraps.$inferInsert;