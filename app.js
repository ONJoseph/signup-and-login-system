const express = require("express");
const userRouter = require("./server/Routes/user-auth");
const { connectToDb } = require("./db");

const port = 3000;
const app = express();

// Connection to the database
connectToDb();

// Body parser middleware
app.use(express.json({ extended: true }));

// Routes
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello registration");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
