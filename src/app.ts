import express from "express";
import mongoose from "mongoose";
import formRoutes from "./routes/formRoutes";
import cors from 'cors'
import 'dotenv/config'

const app = express();
app.use(cors());

app.use(express.json());

app.use("/forms", formRoutes);

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

export default app;
