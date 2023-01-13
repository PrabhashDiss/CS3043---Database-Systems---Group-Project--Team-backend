const {query} = require('../database/dbConnect')
const {formatDate} = require('../helpers/formatDate')

const get_employee_branch = (req, res, next) => {
    const data = query(
        `select branch_code
         from employee
         where employee_id in (select employee_id from users where user = '${req.query.user}');`)
        .then((rows) => {
             return res.send(rows)
        })
}

const get_fd = (req, res, next) => {
    const data = query(
        `CALL GetFD()`)
        .then((rows) => {
             return res.send(rows[0])
        })
}

const get_employee = (req, res, next) => {
    const data = query(
        `SELECT * FROM employee`)
        .then((rows) => {
             return res.send(rows)
        })
}
const add_employee = (req, res, next) => {
    /*
    let employee = req.body;
    var sql = "SET @EmployeeID = ?;SET @BranchCode = ?;SET @EmployeeName = ?; \
    CALL EmployeeAdd(@EmployeeID,@BranchCode,@EmployeeName);"
    const data = query(
        sql,[employee.employee_id, employee.branch_code, employee.employee_name])
        .then((rows) => {
             return res.send(rows)
        })
    */
    const data = query(
        `INSERT INTO employee(employee_id, branch_code, employee_name)
         VALUES('${req.body.branch_code}', '${req.body.branch_code}', '${req.body.branch_code}');`)
        .then((rows) => {
                return res.send({ success: true })
        })
}

const approve_loan = (req, res, next) => {
    const data = query(
        `START TRANSACTION; \
         update loan set is_approved = 1 where loan_number = '${req.body.loan_number}'; \
         update loan set start_date = '${formatDate()}' where loan_number = '${req.body.loan_number}'; \
         update account set balance = balance + ${req.body.amount} where account_number in (select relate_to from account_relate where relate_from in (select account_number from loan_account where loan_number = '${req.body.loan_number}'));
         COMMIT;`)
        .then((rows) => {
             return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}

const get_loan_to_be_approved = (req, res, next) => {
    const data = query(`select loan_number, customer_name, branch_city, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
    from 
    (select loan_number, customer_id, branch_city, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
    from (select *
    from loan_account natural join 
    (select loan_number, branch_city, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
    from 
    (select loan_number, branch_code, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
    from loan 
    where is_approved is NULL or is_approved != 1) as k left outer join branch
    using (branch_code)) as j) as m left outer join account
    using (account_number)) as n left outer join customer
    using (customer_id)`)
        .then((rows) => {
            return res.send({success: true, data: rows})
        })
        .catch((err) => {
            console.log(err)
            return res.send({success: false})
        })
}

const get_loan_payment_due_manager = (req, res, next) => {
    const data = query(`select customer_name, last_payment_date, start_date, ot.customer_id, loan_number, count(loan_number) as payment_count, loan_duration, diff, branch_city
    from (select customer_name, last_payment_date, start_date, it.customer_id, loan_number, count(loan_number), loan_duration, diff, branch_code
        from (select branch_code, DATE_ADD(start_date, INTERVAL loan_duration - count(loan_number) MONTH) as last_payment_date, customer_id, start_date, loan_number, count(loan_number), loan_duration, loan_duration - count(loan_number) as diff
            from loan_payment left outer join (select branch_code, loan_number,loan_duration, start_date, customer_id
                                            from loan natural join (select loan_number, customer_id
                                                                from account natural join loan_account) as j) as k
                                                                using (loan_number) 
        group by loan_number) as it inner join customer on customer.customer_id = it.customer_id) as ot inner join branch on ot.branch_code = branch.branch_code`)
        .then((rows) => {
            return res.send(rows)
        })
}

module.exports = {
    get_employee_branch, get_fd, get_employee, add_employee, approve_loan, get_loan_to_be_approved, get_loan_payment_due_manager
}
