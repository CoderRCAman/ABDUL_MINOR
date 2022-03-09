//imports
const express = require("express");
require("dotenv").config(); //lets us use the env file
require("./connection/db"); // connection to database
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const app = express();
const landingRoutes = require("./routes/landing");
const loginRoutes = require("./routes/auth");
const admissionRoutes = require("./routes/admission");
const staffRoutes = require("./routes/staff");
const standardRoutes = require("./routes/standard");
const morgan = require("morgan");
//templating engine
app.set("view engine", "ejs");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "some random key to hash it",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));
app.use(
  "/",
  landingRoutes,
  loginRoutes,
  admissionRoutes,
  staffRoutes,
  standardRoutes
);
//server initialise 
app.listen(PORT, () => {
  console.log(">>>Server is listening on PORT:", PORT);
});
