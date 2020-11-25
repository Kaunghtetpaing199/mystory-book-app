if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/******************** import modules **********************/
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const expressHbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

/******************** import files **********************/
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const connectDB = require("./config/db");

/******************** using modules and files ********************/

//Passport config
require("./config/passport")(passport);

//connect mongo//
connectDB();

const app = express();

//logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//handlebars
app.engine("hbs", expressHbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

//Sessions
app.use(
  session({
    secret: "I am very handsome!",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set public folder
const rootDir = path.dirname(process.mainModule.filename);
app.use(express.static(path.join(rootDir, "public")));

/******************* Routes ********************/
app.use("/", indexRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server start running on port ${port}`));
