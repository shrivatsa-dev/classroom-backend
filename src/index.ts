import "dotenv/config";
import express from "express";
import cors from "cors";
import subjectsRouter from "./routes/subjects.js";
import securityMiddleware from "./middleware/security.js";

const app = express();
const PORT = 8000;

if (!process.env.FRONTEND_URL) {
  throw new Error("Frontend url is not set in .env file");
}

const frontendOrigin = process.env.FRONTEND_URL.trim().replace(/\/+$/, "");

app.use(express.json());

app.use(securityMiddleware)
app.use(
  cors({
    origin: frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/subjects", subjectsRouter);

app.get("/", (req, res) => {
  res.send("Classroom api");
});

app.listen(PORT, () => {
  console.log(`Server is running in port : ${PORT}`);
});
