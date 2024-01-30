const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(404).json({ message: "User not logged in" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret");

    if (validToken) {
      //move forword with request
      return next();
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { validateToken };
