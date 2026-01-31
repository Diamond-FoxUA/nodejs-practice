import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from "./routes/studentsRoutes.js";
import { errors } from 'celebrate';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT ?? 3000;

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
