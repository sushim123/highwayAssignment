import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./lib/db";
import cookieParser from 'cookie-parser'; 
const app = express();
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

export default app;
