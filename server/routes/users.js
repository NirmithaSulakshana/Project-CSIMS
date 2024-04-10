const crypto = require("crypto");
const express = require("express");
const userRouter = express.Router();
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

//const bcrypt = require("bcrypt");
//const salt = 10;

const { Users } = require("../models");

userRouter.use(express.json());

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

//get all users
userRouter.get("/getUsers", (req, res) => {
  Users.findAll()
    .then((users) => {
      // Send the users as a JSON response
      res.status(200).json(users);
    })
    .catch((err) => {
      // Handle errors
      console.error("Error retrieving users:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//get single user
userRouter.get("/getUsers/:id", (req, res) => {
  const userId = req.params.id;
  Users.findOne({ where: { id: userId } })
    .then((users) => {
      if (!users) {
        // If no user is found, send a 404 response
        res.status(404).json({ message: "User not found" });
        return;
      }
      // Send the user as a JSON response
      res.status(200).json(users);
    })
    .catch((err) => {
      // Handle errors
      console.error("Error retrieving user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//get Pending user
userRouter.get("/getPendingUsers", (req, res) => {
  Users.findAll({ where: { status: "pending" } })
    .then((pendingUsers) => {
      res.status(200).json(pendingUsers);
    })
    .catch((error) => {
      console.log("Error retriving pending users", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Set Approved users by id
userRouter.put("/approve/:id", (req, res) => {
  const userId = req.params.id;
  Users.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return user.update({ status: "approved" });
    })
    .then(() => {
      res.status(200).json({ message: "Approved user successfully" });
    })
    .catch((error) => {
      console.log("Error approving user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Delete user by user id
userRouter.delete("/reject/:id", (req, res) => {
  const userId = req.params.id;

  Users.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return user.destroy();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "User rejected and deleted successfully" });
    })
    .catch((error) => {
      console.error("Error rejecting user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//add new user
userRouter.post("/register", (req, res) => {
  const { firstName, lastName, email, userName, password, country, mobileNo } =
    req.body;

  // Check if the email or username exists
  Users.findOne({
    where: {
      [Op.or]: [{ email }, { userName }],
    },
  })
    .then((existingUser) => {
      if (existingUser) {
        let field;
        if (existingUser.email === email) {
          field = "email";
        } else if (existingUser.userName === userName) {
          field = "userName";
        }

        return Promise.reject({
          status: 409,
          message: `${field} already exists`,
          field,
        });
      }

      // Hash the password using SHA-256
      const hashedPassword = hashPassword(password);

      // Create a new user with hashed password
      return Users.create({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        country,
        mobileNo,
      });
    })
    .then((newUser) => {
      console.log("User added successfully:", newUser.toJSON());
      res.status(201).json({
        message: "User added successfully",
        user: newUser.toJSON(),
      });
    })
    .catch((error) => {
      // Handle errors
      console.error("Error adding user:", error);
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal server error",
        field: error.field || null,
      });
    });
});

//User login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    //console.log("User is", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Hash the entered password using SHA-256
    const enteredHashedPassword = hashPassword(password);

    // Compare the hashed entered password with the stored hashed password in the database
    if (enteredHashedPassword !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //res.status(200).json({ message: "You logged in!" });

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "importantsecret",
      { expiresIn: "1h" }
    );
    // Send the token to the client
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
