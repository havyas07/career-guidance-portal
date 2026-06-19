import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import tasteRoutes from "./routes/tasteRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Career Guidance Portal API is running 🚀" });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Feature routes
app.use("/api/report", reportRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/taste", tasteRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));