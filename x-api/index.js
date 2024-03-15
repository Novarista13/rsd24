require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use("/static", express.static("./photos"));

const { usersRouter } = require("./routers/users");
app.use(usersRouter);

const { postsRouter } = require("./routers/posts");
const { use } = require("bcrypt/promises");
app.use(postsRouter);

app.listen(process.env.PORT, () => {
  console.log(`X API running at ${process.env.PORT}`);
});

// const jwt = require("jsonwebtoken");

// const token = jwt.sign({ name: "Tom", role: "admin" }, "secret");

// console.log(token);

// const data = jwt.verify(token, "secret");
// console.log(data);
