import consola from "consola";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { mw as requestIp } from "request-ip";
import { ENV } from "./utils/env";
import { errorHandler, handle404Error } from "./utils/error.ts";

const PORT = ENV.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// rate limiting stuffs
app.use(requestIp());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
      consola.warn(`DDoS Attempt from ${req.ip}`);
      res.status(429).json({
        error: "Too many requests in a short time. Please try in a minute.",
      });
    },
  })
);

// Logging Stuffs
app.use(morgan("dev"));

// Routes stuffs
app.all("*", handle404Error);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
