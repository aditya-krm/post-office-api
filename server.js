import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db/connectToDB.js";
import consignmentRoutes from "./routes/consignment.routes.js";

dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Swagat hai aapka!!!");
});

app.use("/api/consignment", consignmentRoutes);

app.use("*", (req, res) => {
  // console.log(req.method, req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    // console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
