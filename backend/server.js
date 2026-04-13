require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const contactRoutes = require("./routes/contactsRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow these origins
      const allowedOrigins = [
        'https://full-stack-dashboard-app.vercel.app',
        'http://localhost:5173',
      ]
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true)
      
      // Remove trailing slash from origin before checking
      const cleanOrigin = origin.replace(/\/$/, '')
      
      if (allowedOrigins.includes(cleanOrigin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json());

const defaultLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: "Too many requests" }, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, message: { error: "Too many auth attempts" }, standardHeaders: true, legacyHeaders: false });

app.use("/api/contacts", defaultLimiter, contactRoutes);
app.use("/api/auth", authLimiter, authRoutes);

app.get("/", (req, res) => { res.status(200).json({ status: "Server is running" }) });

app.use(errorHandler);

app.listen(port, () => { console.log(`Server running on port ${port}`) });
module.exports = app;