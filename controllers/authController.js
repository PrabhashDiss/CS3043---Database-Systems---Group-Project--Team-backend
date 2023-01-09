const jwt = require("jsonwebtoken");

const users = [
  {
    email: "sandev",
    password: "123",
    role: "customer",
  },
  {
    email: "admin",
    password: "123",
    role: "admin",
  },
];

const login_post = (req, res, next) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "1800s",
    }
  );

  return res.status(200).send({success: true, token : token})
}

const customer_register_post = (req, res, next) => {
  const {city , street, name, address} = req.body;

  return res.send('TODO')
}

module.exports = {
  login_post,
  customer_register_post
};
