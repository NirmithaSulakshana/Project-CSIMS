require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Users Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

//Items Routes
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port: ", process.env.PORT);
  });
});
