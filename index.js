const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const {authorizeRoles} = require('./middleware/middlewares')
// controllers
const {login_post, customer_register_post} = require('./controllers/authController')
const {get_customer_info} = require('./controllers/customerController')


// routes
app.use('/api/login', (req, res) => {
  login_post(req, res)
})

app.use('/api/customerRegister', (req, res) => {
  customer_register_post(req, res)
})

app.use('/api/getCustomerInfo',authorizeRoles(['customer', 'admin']), (req, res) => {
  get_customer_info(req, res)
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
