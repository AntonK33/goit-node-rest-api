import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";

import auth from './routes/auth.js';


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/users",auth);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
});
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
  ;