const { query } = require('../database/dbConnect')
const { formatDate } = require('../helpers/formatDate')
const e = require("express");

const get_customer_info = (req, res, next) => {
    const data = query(`SELECT *  FROM account a, transaction t WHERE a.account_number=t.account_number and customer_id = '${req.query.user}' ORDER BY transaction_timestamp DESC`)
        .then((rows) => {
            return res.send(rows)
        })
}

const get_account = (req, res, next) => {
    const data = query(`select * from account where customer_id = '${req.query.user}';`)
        .then((rows) => {
            return res.send(rows)
        })
}
const add_account_fd = (req, res, next) => {
    const data = query(`
         START TRANSACTION; \
         \
         INSERT INTO account(account_number, customer_id, branch_code, account_type_id, balance, open_date, is_personal) \
         VALUES('${req.body.account_number}', '${req.body.customer_id}', '${req.body.branch_code}', '${req.body.account_type_id}', ${req.body.balance}, '${req.body.open_date}', '${req.body.is_personal}'); \
         \
         INSERT INTO account_relate(relate_from, relate_to) \
         VALUES('${req.body.account_number_from}', '${req.body.account_number_to}'); \
         \
         COMMIT;`)
        .then((rows) => {
            return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}
const add_account_saving = (req, res, next) => {
    /*
    let account = req.body;
    var sql = "SET @AccountNumber = ?;SET @CustomerID = ?;SET @BranchCode = ?;SET @AccountTypeID = ?;SET @Balance = ?;SET @LastActiveDate = ?;SET @OpenDate = ?; \
    CALL AccountAdd(@AccountNumber,@CustomerID,@BranchCode,@AccountTypeID,@Balance,@LastActiveDate,@OpenDate);"
    const data = query(
        sql,[account.account_number, account.customer_id, account.branch_code, account.account_type_id, parseFloat(account.balance), account.last_active_date, account.open_date])
        .then((rows) => {
             return res.send(rows)
        })
    */
    const data = query(`INSERT INTO account(account_number, customer_id, branch_code, account_type_id, balance, open_date, is_personal) \
         VALUES('${req.body.account_number}', '${req.body.customer_id}', '${req.body.branch_code}', '${req.body.account_type_id}', ${req.body.balance}, '${req.body.open_date}', '${req.body.is_personal}');`)
        .then((rows) => {
            return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}
const get_eligible_saving_accounts = (req, res, next) => {
    const data = query(`select account_number, balance from account left outer join account_type using(account_type_id) where customer_id = '${req.query.user}' and account_type = 'saving'`)
        .then((rows) => {
            return res.send(rows)
        })
}
const get_eligible_fd_accounts = (req, res, next) => {
    const data = query(`select account_number, balance from account left outer join account_type using(account_type_id) where customer_id = '${req.query.user}' and account_type = 'fd' and balance * 0.6 < 500000;`)
        .then((rows) => {
            return res.send(rows)
        })
}

const add_loan_payment = (req, res, next) => {
    /*
    let loan_payment = req.body;
    var sql = "SET @PaymentID = ?;SET @LoanNumber = ?;SET @PaymentReferenceNumber = ?;SET @PaymentDate = ?;SET @PaymentAmount = ?;SET @PaymentStatus = ?;SET @Remarks = ?; \
    CALL LoanPaymentAdd(@PaymentID,@LoanNumber,@PaymentReferenceNumber,@PaymentDate,@PaymentAmount,@PaymentStatus,@Remarks);"
    const data = query(
        sql,[loan_payment.payment_id, loan_payment.loan_number, loan_payment.payment_reference_number, loan_payment.payment_date, loan_payment.payment_amount, loan_payment.payment_status, loan_payment.remarks])
        .then((rows) => {
             return res.send(rows)
        })
    */
    const data = query(`INSERT INTO loan_payment(loan_number, payment_id, payment_reference_number, payment_date, payment_amount, proof_of_payment, payment_status, remarks)
         VALUES('${req.body.loan_number}', '${req.body.payment_id}', '${req.body.payment_reference_number}', '${req.body.payment_date}', ${req.body.payment_amount}, '${req.body.proof_of_payment}', '${req.body.payment_status}', '${req.body.remarks}');`)
        .then((rows) => {
            return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}
const get_loan_payment = (req, res, next) => {
    const data = query(`select loan_number,payment_amount,payment_date from (select customer_id,loan_number from account natural join loan_account) as k  natural join loan_payment where customer_id = '${req.query.user}'
                        order by payment_date;`)
        .then((rows) => {
            return res.send(rows)
        })
}
const get_loan_payment_due_customer = (req, res, next) => {
    let rows1, rows2;
    const data1 = query(`select customer_name, last_payment_date, start_date, ot.customer_id, loan_number, count(loan_number) as payment_count, loan_duration, diff, branch_city
    from (select customer_name, last_payment_date, start_date, it.customer_id, loan_number, count(loan_number), loan_duration, diff, branch_code
        from (select branch_code, DATE_ADD(start_date, INTERVAL loan_duration - count(loan_number) MONTH) as last_payment_date, customer_id, start_date, loan_number, count(loan_number), loan_duration, loan_duration - count(loan_number) as diff
            from loan_payment left outer join (select branch_code, loan_number,loan_duration, start_date, customer_id
                                            from loan natural join (select loan_number, customer_id
                                                                from account natural join loan_account where customer_id = "${req.query.user}") as j) as k
                                                                using (loan_number) 
        group by loan_number) as it inner join customer on customer.customer_id = it.customer_id) as ot inner join branch on ot.branch_code = branch.branch_code`)
        .then((rows1) => {
            const newlist = []
            for (let i = 0; i < rows1.length; i++) {
                const data2 = query(`select payment_amount,payment_date from (select customer_id,loan_number from account natural join loan_account) as k  natural join loan_payment where loan_number = '${rows1[i].loan_number}'
            order by payment_date`)
                    .then((rows2) => {
                        newlist.push({
                            ...rows1[i],
                            payment: rows2
                        })
                        return res.send(newlist)
                    })
            }
        })
}

const get_transaction_latest = (req, res, next) => {
    const data = query(`select transaction_id, account_number_from, transaction_description, amount, execution_branch_code, transaction_timestamp, account_number_to
         from transaction
         where account_number_from = "${req.query.account_number}" or account_number_to = "${req.query.account_number}"
         order by transaction_timestamp desc
         limit 6`)
        .then((rows) => {
            return res.send({ rows: rows, req: req.query.account_number })
        })
}
const get_transaction_all = (req, res, next) => {
    const data = query(`select transaction_id, account_number_from, transaction_description, amount, branch_city, transaction_timestamp, account_number_to
        from (select transaction_id, account_number_from, transaction_description, amount, execution_branch_code as branch_code, transaction_timestamp, account_number_to
        from transaction
        order by execution_branch_code) as k left outer join branch
        using (branch_code)`)
        .then((rows) => {
            return res.send(rows)
        })
}
const get_transaction_from = (req, res, next) => {
    const data = query(`select transaction_id, account_number_from, transaction_description, amount, execution_branch_code, transaction_timestamp, account_number_to
         from transaction
         where account_number_from = "${req.body.account_number}"
         order by execution_branch_code;`)
        .then((rows) => {
            return res.send(rows)
        })
}
const get_transaction_to = (req, res, next) => {
    const data = query(`select transaction_id, account_number_from, transaction_description, amount, execution_branch_code, transaction_timestamp, account_number_to
         from transaction
         where account_number_to = "${req.body.account_number}"
         order by execution_branch_code;`)
        .then((rows) => {
            return res.send(rows)
        })
}
const add_transaction = (req, res, next) => {
    let time = req.body.transaction_timestamp
    time = time.replaceAll(': ', ':')
    const data = query(`START TRANSACTION; \
         INSERT INTO transaction(transaction_id, account_number_to, account_number_from, transaction_description, amount, execution_branch_code, transaction_timestamp) \
         VALUES('${req.body.transaction_id}', '${req.body.account_number_to}', '${req.body.account_number_from}', '${req.body.transaction_description}', ${req.body.amount}, '${req.body.execution_branch_code}', '${time}'); \
         update account set balance = balance - ${parseFloat(req.body.amount)} where account_number = '${req.body.account_number_from}'; \
         update account set balance = balance + ${parseFloat(req.body.amount)} where account_number = '${req.body.account_number_to}'; \
         COMMIT;`)
        .then((rows) => {
            return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}

const get_loans_for_customer = (req, res, next) => {
    const data = query(`select round(((base_amount + (base_amount*loan_type.interest_rate))/loan_duration), 2) as installment, \
loan_number,branch_code, loan_duration,loan_type.interest_rate,base_amount,start_date, due_date,is_personal,is_online, loan_status,is_approved \
from loan inner join loan_type using(loan_type_id) where loan_number in (select loan_number from loan_account where account_number in (select account_number from account where customer_id = '${req.query.user}'))`)
        .then((rows) => {
            return res.send({ success: true, data: rows })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}

module.exports = {
    get_customer_info,
    get_account,
    add_account_fd,
    add_account_saving,
    add_loan_payment,
    get_loan_payment,
    add_transaction,
    get_eligible_saving_accounts,
    get_eligible_fd_accounts,
    get_transaction_from,
    get_transaction_to,
    get_transaction_latest,
    get_transaction_all,
    get_loan_payment_due_customer,
    get_loans_for_customer
}
