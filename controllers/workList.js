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

exports.insWork = async (req, res, next) => {
    let { body } = req
    let result = []
    const date = moment().format('Y-M-D H:mm:ss')
    console.log(body)
    console.log(date)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        result = connection.query(`INSERT INTO work_list(td_username, td_content, td_dept, td_insBy, td_insDt, td_status)
    VALUES ('${body.username}','${body.doing}','${body.going}','${body.username}','${date}',0);`);

    })

    res.send({ 'status': 'ok', 'result': result })


}
