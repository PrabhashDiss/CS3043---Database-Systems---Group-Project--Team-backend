const jwt = require("jsonwebtoken");
const { query } = require("../database/dbConnect");

const login_post = (req, res, next) => {
  query(
    `select user,password,role
     from users
     where user = '${req.body.user_id}' and password = '${req.body.password}';`
  ).then((users) => {
    const { user_id, password } = req.body;

    const User = users.find(
      (u) => u.rows[0].user === user_id && u.rows[0].password === password
    );

    if (!User) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user: data.rows[0].user, role: data.rows[0].role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1800s",
      }
    );

    return res.status(200).send({ success: true, token: token });
  });
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
