const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  console.log(authorization);
  console.log("gets a token")
  console.log(authorization.split(" "));
  console.log("splits by spaces")
  console.log(authorization.split(" ")[0]);
  console.log("this takes the first item in the split")
  console.log(authorization.split(" ")[1]);
  console.log("takes the second")

  const token = authorization.split(" ")[1];

  try {
    console.log(authorization);
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    //^^^^ this finds the user by id but then instead of taking all of the info it only takes whats under id
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

