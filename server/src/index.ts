import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import AuthRoutes from './routes/auth.route';
import ProfileRoutes from './routes/profile.route';
import { IsAuthenticated } from './middlewares/auth';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/profile', IsAuthenticated, ProfileRoutes);

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
