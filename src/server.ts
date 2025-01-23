import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { db } from './db';
import { touristTraps } from './db/schema';
import { eq, sql } from 'drizzle-orm';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// GET - List all traps
app.get('/traps', async (req, res) => {
    const traps = (await db.select().from(touristTraps).orderBy(touristTraps.trapCount)).reverse();
    const html = traps.map(trap => `
        <div class="trap-card">
            <img src="${trap.imageSrc}" alt="${trap.name}" class="trap-image">
            <h3>${trap.name}</h3>
            <p>${trap.location}</p>
            <p>${trap.description}</p>
            <button 
                hx-patch="/traps/${trap.id}/increment"
                hx-swap="outerHTML"
                hx-target="closest .trap-card"
            >
                🪤 Count: ${trap.trapCount}
            </button>
        </div>
    `).join('');
    res.send(html);
});

// POST - Add new trap
app.post('/traps', async (req, res) => {
    const { name, location, description, imageSrc } = req.body;
    const newTrap = await db.insert(touristTraps)
        .values({ name, location, description, imageSrc })
        .returning();
    res.json(newTrap[0]);
});

// PATCH - Increment trap counter
app.patch('/traps/:id/increment', async (req, res) => {
    const { id } = req.params;
    const updated = await db
        .update(touristTraps)
        .set({
            trapCount: sql`${touristTraps.trapCount} + 1`,
            updatedAt: new Date()
        })
        .where(eq(touristTraps.id, parseInt(id)))
        .returning();

    const trap = updated[0];
    const html = `
        <div class="trap-card">
            <img src="${trap.imageSrc}" alt="${trap.name}" class="trap-image">
            <h3>${trap.name}</h3>
            <p>${trap.location}</p>
            <p>${trap.description}</p>
            <button 
                hx-patch="/traps/${trap.id}/increment"
                hx-swap="outerHTML"
                hx-target="closest .trap-card"
            >
                🪤 Count: ${trap.trapCount}
            </button>
        </div>
    `;
    res.send(html);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});

export default app;