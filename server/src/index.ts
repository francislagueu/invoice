import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express API using Typescript');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
