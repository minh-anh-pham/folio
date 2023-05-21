const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const progressRouter = require("./routes/progresses");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const db = require("./db/db");
const logger = require("./middleware/logger");

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/progresses", progressRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

// run node server.js -> postman -> localhost:3000 -> get 200
app.get("/", (req, res) => {
    res.send({msg: "This is a GET request"});
})

// start of application
// run by $ node src/server.js
app.listen(5000, async () => {
    // make sure tables exist and are updated
    await db.sync();
    console.log("Server is listening on port 5000");
});
