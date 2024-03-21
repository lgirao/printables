import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';

if(process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: 'backend/config/config.env' });
}

// Connect database
connectDatabase();

app.use(express.json());

// Import all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const server = app.listen(port, () => {
    console.log(`Server is listening on port: ${port} in ${env} mode`);
});