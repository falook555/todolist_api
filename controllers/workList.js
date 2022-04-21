const moment = require('moment')

exports.getAll = (req, res, next) => {
    let username = req.params.username
    req.getConnection((err, connection) => {
        if (err) return next(err)
        let sql = `SELECT * FROM work_list where td_username = '${username}' and td_status != 9`;
        connection.query(sql, (err, row) => {
            if (err) return next(err)
            res.send(row)
        })
    })
    
}
