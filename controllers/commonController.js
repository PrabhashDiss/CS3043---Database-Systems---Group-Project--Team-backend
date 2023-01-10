const {query} = require('../database/dbConnect')

const get_branch = (req, res, next) => {
    const data = query(
        `SELECT * FROM branch`)
        .then((rows) => {
             return res.send(rows)
        })
}

const add_loan = (req, res, next) => {
    /*
    let loan = req.body;
    var sql = "SET @LoanNumber = ?;SET @BranchCode = ?;SET @LoanTypeID = ?;SET @LoanDuration = ?;SET @InterestRate = ?;SET @StartDate = ?;SET @DueDate = ?;SET @IsPersonal = ?;SET @IsOnline = ?; \
    CALL LoanAdd(@LoanNumber,@BranchCode,@LoanTypeID,@LoanDuration,@InterestRate,@StartDate,@DueDate,@IsPersonal,@IsOnline);"
    const data = query(
        sql,[loan.loan_number, loan.branch_code, loan.loan_type_id, loan.loan_duration, loan.interest_rate, loan.start_date, loan.due_date, loan.is_personal, loan.is_online])
        .then((rows) => {
             return res.send(rows)
        })
    */
    const data = query(
        `INSERT INTO loan(loan_number, branch_code, amount, loan_type_id, loan_duration, start_date, due_date, is_personal, is_online, loan_status, is_approved)
         VALUES('${req.body.loan_number}', '${req.body.branch_code}', ${req.body.amount}, '${req.body.loan_type_id}', ${req.body.loan_duration}, '${req.body.start_date}', '${req.body.due_date}', ${req.body.is_personal}, ${req.body.is_online}, ${req.body.loan_status}, ${req.body.is_approved});`)
        .then((rows) => {
                return res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
            return res.send({ success: false })
        })
}

module.exports = {
    get_branch, add_loan
}
