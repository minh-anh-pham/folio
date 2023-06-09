require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const db = require("./db/db");
const logger = require("./middleware/logger");
const path = require("path");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const progressRouter = require("./routes/progresses");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const personalRouter = require("./routes/personal");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger);
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/progresses", progressRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/personal", personalRouter);
app.use(express.static(path.join(__dirname + "/public")));

// run node server.js -> postman -> localhost:3000 -> get 200
app.get("/*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../public/index.html"),
        function (error) {
            if (error) {
                res.status(500).send(error);
            }
        }
    )
});

app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name: error.name, message: error.message});
  });

const PORT = process.env.PORT || 5000;
// start of application
// run by $ node src/server.js
app.listen(PORT, async () => {
    // make sure tables exist and are updated
    await db.sync();
    //console.log("Server is listening on port 5000");
});
