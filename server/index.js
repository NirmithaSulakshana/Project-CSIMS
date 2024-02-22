require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = require("./models");

//Users Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

//Items Routes
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

//Mail Router
const mailRouter = require("./routes/sendEmails");
app.use("/api/mail", mailRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port: ", process.env.PORT);
  });
});
