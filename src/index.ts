import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./lib/db";
const app = express();
connectDB();
app.use(bodyParser.json());
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
