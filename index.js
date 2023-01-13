const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
const {authorizeRoles} = require("./middleware/middlewares");
// controllers
const {
    login_post,
    customer_register_post,
} = require("./controllers/authController");
const {
  get_customer_info,
  add_account_fd,
  add_account_saving,
  add_loan_payment,
  get_loan_payment,
  add_transaction,
  get_eligible_fd_accounts,
  get_eligible_saving_accounts,
  get_account,
  get_transaction_from,
  get_transaction_to,
  get_transaction_latest,
  get_transaction_all,
  get_loan_payment_due, get_loans_for_customer,
} = require("./controllers/customerController");
const {add_loan, get_branch} = require("./controllers/commonController");
const {
    get_employee_branch,
    get_fd,
    get_employee,
    add_employee,
    approve_loan,
    get_loan_to_be_approved,
} = require("./controllers/managerController");

// routes
app.use("/api/login", (req, res) => {
    login_post(req, res);
});

app.use("/api/customerRegister", (req, res) => {
    customer_register_post(req, res);
});

app.use(
    "/api/getCustomerInfo",
    authorizeRoles(["customer", "admin"]),
    (req, res) => {
        get_customer_info(req, res);
    }
);

app.get("/getEmployeeBranch", (req, res) => {
    get_employee_branch(req, res);
});
app.get("/getBranch", (req, res) => {
    get_branch(req, res);
});

app.get("/getAccount", authorizeRoles(["customer"]), (req, res) => {
    get_account(req, res);
});
app.post("/addAccountFD", authorizeRoles(["customer"]), (req, res) => {
    add_account_fd(req, res);
});
app.post("/addAccountSaving", authorizeRoles(["customer"]), (req, res) => {
    add_account_saving(req, res);
});
app.get("/getFD", authorizeRoles(["manager"]), (req, res) => {
    get_fd(req, res);
});

app.get("/getEmployee", authorizeRoles(["manager"]), (req, res) => {
    get_employee(req, res);
});
app.post("/addEmployee", authorizeRoles(["manager"]), (req, res) => {
    add_employee(req, res);
});

app.post("/addLoan", authorizeRoles(["customer", "manager"]), (req, res) => {
    add_loan(req, res);
});
app.get(
    "/getEligibleFDAccounts",
    authorizeRoles(["customer"]),
    (req, res) => {
        get_eligible_fd_accounts(req, res);
    }
);
app.get(
    "/getEligibleSavingAccounts",
    authorizeRoles(["customer"]),
    (req, res) => {
        get_eligible_saving_accounts(req, res);
    }
);
app.post("/approveLoan", authorizeRoles(["manager"]), (req, res) => {
    approve_loan(req, res);
});

app.get("/getLoanPayment", authorizeRoles(["customer"]), (req, res) => {
  get_loan_payment(req, res);
});
app.get("/getLoanPaymentDue", authorizeRoles(["customer"]), (req, res) => {
    get_loan_payment_due(req, res);
  });
app.post("/addLoanPayment", authorizeRoles(["customer"]), (req, res) => {
    add_loan_payment(req, res);
});

app.get("/getTransactionAll", authorizeRoles(["customer"]), (req, res) => {
    get_transaction_all(req, res);
  });
app.get("/getTransactionFrom", authorizeRoles(["customer"]), (req, res) => {
  get_transaction_from(req, res);
});
app.get("/getTransactionTo", authorizeRoles(["customer"]), (req, res) => {
    get_transaction_to(req, res);
  });
app.get("/getTransactionLatest", authorizeRoles(["customer"]), (req, res) => {
  get_transaction_latest(req, res);
});
app.post("/addTransaction", authorizeRoles(["customer"]), (req, res) => {
    add_transaction(req, res);
});

app.get('/getLoanToBeApproved', authorizeRoles(['manager']), (req, res) => {
    get_loan_to_be_approved(req, res)
})
app.get('/getLoanForecast', authorizeRoles(['customer', 'manager']), (req, res) => {
    get_loans_for_customer(req, res)
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
