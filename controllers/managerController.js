const {query} = require('../database/dbConnect')

const get_fd = (req, res, next) => {
    const data = query(
        `select account_number,balance*interest_rate*0.01 as interest_amount
         from account,account_type
         where account.account_type_id = account_type.account_type_id and account_type = 'fd'
         order by branch_code`)
        .then((rows) => {
             return res.send(rows)
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
        `update loan set is_approved = 1 where loan_number = '${req.query.loan_number}'`)
        .then((rows) => {
             return res.send({ success: true })
        })
}

module.exports = {
    get_fd, get_employee, add_employee, approve_loan
}
