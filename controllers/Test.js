const moment = require('moment')

exports.getAll = (req, res, next) => {
    // let id = req.params.id
    req.getConnection((err, connection) => {
        if (err) return next(err)
        let sql = `SELECT * FROM work_list  `;
        connection.query(sql, (err, row) => {
            if (err) return next(err)
            res.send(row)
        })
    })
    
}

exports.getAll2 = (req, res, next) => {
}

