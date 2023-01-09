const {query} = require('../database/dbConnect')

const get_customer_info = (req, res, next) => {
    const data = query(
        `SELECT *  FROM account a, transaction t WHERE a.account_number=t.account_number and customer_id = '${req.query.user}' ORDER BY transaction_timestamp DESC`)
        .then((rows) => {
             return res.send(rows)
        })
}

module.exports = {
    get_customer_info
}
