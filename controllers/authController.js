const jwt = require("jsonwebtoken");
const { query } = require("../database/dbConnect");

const login_post = (req, res, next) => {
  try {
    const q = `select user,password,role from users where user = '${req.body.user_id}' and password = '${req.body.password}';`;

    query(
        `select user,password,role from users where user = '${req.body.user_id}' and password = '${req.body.password}';`
    ).then((users) => {
      const { user_id, password } = req.body;

      const User = users.find(
          (u) => u.user === user_id && u.password === password
      );

      if (!User) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
          { user: User.user, role: User.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "1800s",
          }
      );

      return res.status(200).send({ success: true, token: token, user: User.user, role: User.role });
    });
  } catch (e) {
    return res.send(e.message)
  }
};

const customer_register_post = (req, res, next) => {
  const data = query(
    `insert into users values ('${req.body.user}','${req.body.password}','${req.body.role}');`
  ).then((rows) => {
    return res.send(rows);
  });
};

module.exports = {
  login_post,
  customer_register_post,
};
