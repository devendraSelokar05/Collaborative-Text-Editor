import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import codeRoutes from "./routes/codeRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"

const app = express();
app.use(cors());

dotenv.config();

ConnectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Correcting here

app.use("/api",codeRoutes)
app.use("/api", UserRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:4000 : ${PORT}`);
});
