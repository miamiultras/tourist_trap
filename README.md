# Tourist Trap Counter 🪤

Interactive web application for tracking and rating tourist traps around the world. Built with modern web technologies focusing on simplicity and real-time interactions.

## Features

- Real-time counter updates with HTMX
- Sorting by popularity (counter value)
- Preview popups for each location
- Emoji-based interaction (🪤)

## Tech Stack

- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Frontend**: HTMX for dynamic updates
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
pnpm install

# Setup database
pnpm drizzle-kit generate:pg
pnpm drizzle-kit push:pg

# Run development server
pnpm dev
