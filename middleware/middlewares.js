const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

const authorizeRoles = (permission) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (token == null) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Invalid token" });
      }

      const role = user.role;

      const result = permission.includes(role);
      if (result) {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "You are not allowed for this action" });
      }
    });
  };
};

module.exports = { authorizeRoles};
