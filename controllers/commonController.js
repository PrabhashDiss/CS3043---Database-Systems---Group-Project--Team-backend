const {query} = require('../database/dbConnect')

const add_loan = (req, res, next) => {
    let loan = req.body;
    var sql = "SET @LoanNumber = ?;SET @BranchCode = ?;SET @LoanTypeID = ?;SET @LoanDuration = ?;SET @InterestRate = ?;SET @StartDate = ?;SET @DueDate = ?;SET @IsPersonal = ?;SET @IsOnline = ?; \
    CALL LoanAdd(@LoanNumber,@BranchCode,@LoanTypeID,@LoanDuration,@InterestRate,@StartDate,@DueDate,@IsPersonal,@IsOnline);"
    const data = query(
        sql,[loan.loan_number, loan.branch_code, loan.loan_type_id, loan.loan_duration, loan.interest_rate, loan.start_date, loan.due_date, loan.is_personal, loan.is_online])
        .then((rows) => {
             return res.send(rows)
        })
}

module.exports = {
    add_loan
}
