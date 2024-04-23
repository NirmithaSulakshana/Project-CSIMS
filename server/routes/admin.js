const express = require("express");
const adminRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Op, where } = require("sequelize");

const { Admins } = require("../models");

adminRouter.use(express.json());

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

//get all admins
adminRouter.get("/getAdmins", (req, res) => {
  Admins.findAll()
    .then((admins) => {
      res.status(200).json(admins);
    })
    .catch((err) => {
      console.log("Error retreving admins", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//get single admin
adminRouter.get("/getAdmins:id", (req, res) => {
  const adminId = req.params.id;
  Admins.findOne({ where: { id: adminId } })
    .then((admin) => {
      if (!admin) {
        res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    })
    .catch((err) => {
      console.log("Error retriving admin", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//admin signup
adminRouter.post("/register", async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    password,
    nic,
    email,
    mobileno,
    admincode,
  } = req.body;

  if (req.body.userType === "admin") {
    const correctAdminCode = "12345";
    if (admincode !== correctAdminCode) {
      return res.status(400).json({ message: "Incorrect admin code" });
    }
  }

  try {
    const existingAdmin = await Admins.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });

    if (existingAdmin) {
      const existingField =
        existingAdmin.username === username ? "username" : "email";
      return res
        .status(400)
        .json({ message: `${existingField} already exists` });
    }

    const newAdmin = await Admins.create({
      firstName: firstname,
      lastName: lastname,
      userName: username,
      password: hashPassword(password),
      NIC: nic,
      email: email,
      mobileNo: mobileno,
      isAdmin: req.body.userType === "admin",
      isSalesManager: req.body.userType === "sales manager",
      AdminCode: admincode,
    });

    res
      .status(201)
      .json({ message: "Admin account created successfully", admin: newAdmin });
  } catch (err) {
    console.error("Error creating admin account", err);
    res.status(500).json({ message: "Internal servrer error" });
  }
});

//Admin login
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const admin = await Admins.findOne({ where: { email: email } });

    if (!admin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const hashedPassword = hashPassword(password);

    if (
      hashedPassword !== admin.password ||
      admin.isAdmin !== (userType === "admin")
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      "importantsecret",
      { expiresIn: "1h" }
    );
    // Send the token to the client
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = adminRouter;
