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
const {get_customer_info, add_account, add_loan_payment, get_loan_payment, add_transaction, get_eligible_loan_accounts} = require('./controllers/customerController')
const {add_loan} = require('./controllers/commonController')
const {get_fd, get_employee, add_employee, approve_loan} = require('./controllers/managerController')


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

app.get('/getAccount',authorizeRoles(['customer']), (req, res) => {
  get_account(req, res)
})
app.post('/addAccount',authorizeRoles(['customer']), (req, res) => {
  add_account(req, res)
})
app.get('/getFD',authorizeRoles(['admin']), (req, res) => {
  get_fd(req, res)
})

app.get('/getEmployee',authorizeRoles(['admin']), (req, res) => {
  get_employee(req, res)
})
app.post('/addEmployee',authorizeRoles(['admin']), (req, res) => {
  add_employee(req, res)
})

app.post('/addLoan',authorizeRoles(['customer', 'admin']), (req, res) => {
  add_loan(req, res)
})
app.get('/api/getEligibleLoanAccounts',authorizeRoles(['customer']), (req, res) => {
  get_eligible_loan_accounts(req, res)
})
app.post('/approveLoan',authorizeRoles(['admin']), (req, res) => {
  approve_loan(req, res)
})

app.post('/addLoanPayment',authorizeRoles(['customer']), (req, res) => {
  add_loan_payment(req, res)
})
app.get('/getLoanPayment',authorizeRoles(['customer']), (req, res) => {
  get_loan_payment(req, res)
})

app.post('/addTransaction',authorizeRoles(['customer']), (req, res) => {
  add_transaction(req, res)
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
