const mysql = require("mysql");

const connection = () => {

}

const query = (query) =>
{
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.

        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: process.env.MULTIPLE_STATEMENTS
        });

        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to database.");
        });
        query = query.replace('\n', ' ')
        connection.query(query, function (err, rows, fields) {
            // Call reject on error states,
            // Call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    connection,
    query
}
