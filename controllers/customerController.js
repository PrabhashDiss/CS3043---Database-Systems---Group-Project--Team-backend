const {query} = require('../database/dbConnect')

const get_customer_info = (req, res, next) => {
    const data = query(
        `SELECT *  FROM account a, transaction t WHERE a.account_number=t.account_number and customer_id = '${req.query.user}' ORDER BY transaction_timestamp DESC`)
        .then((rows) => {
             return res.send(rows)
        })
}

const add_account = (req, res, next) => {
    let account = req.body;
    var sql = "SET @AccountNumber = ?;SET @CustomerID = ?;SET @BranchCode = ?;SET @AccountTypeID = ?;SET @Balance = ?;SET @LastActiveDate = ?;SET @OpenDate = ?; \
    CALL AccountAdd(@AccountNumber,@CustomerID,@BranchCode,@AccountTypeID,@Balance,@LastActiveDate,@OpenDate);"
    const data = query(
        sql,[account.account_number, account.customer_id, account.branch_code, account.account_type_id, parseFloat(account.balance), account.last_active_date, account.open_date])
        .then((rows) => {
             return res.send(rows)
        })
}

const get_eligible_loan_accounts = (req, res, next) => {
    const data = query(
        `select account_number from account left outer join account_type using(account_type_id) where customer_id = '${req.query.user}' and account_type = 'saving' and balance * 0.6 < 500000;`)
        .then((rows) => {
             return res.send(rows)
        })
}

const add_loan_payment = (req, res, next) => {
    let loan_payment = req.body;
    var sql = "SET @PaymentID = ?;SET @LoanNumber = ?;SET @PaymentReferenceNumber = ?;SET @PaymentDate = ?;SET @PaymentAmount = ?;SET @PaymentStatus = ?;SET @Remarks = ?; \
    CALL LoanPaymentAdd(@PaymentID,@LoanNumber,@PaymentReferenceNumber,@PaymentDate,@PaymentAmount,@PaymentStatus,@Remarks);"
    const data = query(
        sql,[loan_payment.payment_id, loan_payment.loan_number, loan_payment.payment_reference_number, loan_payment.payment_date, loan_payment.payment_amount, loan_payment.payment_status, loan_payment.remarks])
        .then((rows) => {
             return res.send(rows)
        })
}
const get_loan_payment = (req, res, next) => {
    const data = query(
        `select loan_number,payment_amount from (select customer_id,loan_number from account natural join loan_account) as k  natural join loan_payment where customer_id = '${req.query.user}'`)
        .then((rows) => {
             return res.send(rows)
        })
}

const add_transaction = (req, res, next) => {
    let transaction = req.body;
    var sql = "SET @TransactionID = ?;SET @AccountNumberTo = ?;SET @AccountNumberFrom = ?;SET @TransactionDescription = ?;SET @Amount = ?;SET @TransactionTimestamp = ?;SET @ExecutionBranchCode = ?; \
    CALL TransactionAdd(@TransactionID,@AccountNumberTo,@AccountNumberFrom,@TransactionDescription,@Amount,@TransactionTimestamp,@ExecutionBranchCode);"
    const data = query(
        sql,[transaction.transaction_id, transaction.account_number_to, transaction.account_number_from, transaction.transaction_description, transaction.amount, transaction.transaction_timestamp, transaction.execution_branch_code])
        .then((rows) => {
             return res.send(rows)
        })
    data = query(
        `update account set balance = balance - '${req.body.amount}' where account_number = '${req.body.account_number_from}'; \
         update account set balance = balance + '${req.body.amount}' where account_number = '${req.body.account_number_to}';`)
        .then((rows) => {
                return res.send(rows)
        })
}

module.exports = {
    get_customer_info, add_account, add_loan_payment, get_loan_payment, add_transaction, get_eligible_loan_accounts
}
