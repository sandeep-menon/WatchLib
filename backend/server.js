import express from "express";
import dotenv from "dotenv";
import authenticationRoutes from "./routes/authentication.js";
import personRoutes from "./routes/person.js";
import cors from "cors";

const allowedOrigins = [
    "http://localhost:5173",
    process.env.ALLOWED_ORIGIN
]

dotenv.config();

const app = express();
app.use(
    cors({
        origin: allowedOrigins, // Allow only specific origins
        methods: ["GET"], // Allow only necessary HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allow only necessary headers
    })
);
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authenticationRoutes);
app.use("/api/person", personRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
