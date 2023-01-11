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

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}
function formatDate() {
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + ' ' + startTime()
}
const approve_loan = (req, res, next) => {
    const data = query(
        `START TRANSACTION; \
         update loan set is_approved = 1 where loan_number = '${req.body.loan_number}'; \
         update loan set start_date = '${formatDate()}' where loan_number = '${req.body.loan_number}'; \
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
    const data = query(`select customer_name, branch_city, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
    from 
    (select customer_id, branch_city, amount, loan_duration, request_date, due_date, is_personal, is_online, loan_status
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

module.exports = {
    get_fd, get_employee, add_employee, approve_loan, get_loan_to_be_approved
}
