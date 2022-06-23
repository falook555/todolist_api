const moment = require('moment')

exports.getAll = (req, res, next) => {
    let username = req.params.username
    req.getConnection((err, connection) => {
        if (err) return console.log(err)

        try {
            let sql = `SELECT * FROM todolists where usr_username = '${username}' and td_status <> 9 and DATE(td_insDt) = CURRENT_DATE ORDER BY td_id DESC `;
            // let sql = `SELECT * FROM todolists where usr_username = '${username}' and td_status <> 9 and td_insDt LIKE '2022-06-20%' ORDER BY td_id DESC`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

exports.getReport = (req, res, next) => {

    let username = req.params.username
    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `SELECT * FROM todolists where usr_username = '${username}' and td_status <> 9 ORDER BY td_id DESC`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

exports.insWork = async (req, res, next) => {
    let { body } = req
    let result = []
    const date = moment().format('Y-M-D H:mm:ss')
    let data = {
        'usr_username': body.username,
        'td_dept': body.dept,
        'td_case': body.case,
        'td_insBy': body.username,
        'td_insDt': date,
        'td_status': '0'
    }

    if (body.username != '' && body.dept != '' && body.case != '') {
        req.getConnection((error, connection) => {
            if (error) throw error;
            connection.query(`
            INSERT INTO todolists set ?`, data, function (error, results, fields) {
                if (error) throw error;
                connection.destroy();
                res.send({ 'status': 'ok', 'result': results })
            });
        });
    } else {
        res.send({ 'status': 'Not-ok', 'result': results })
    }

}

//------------------------------------------------------------------------------------------------------------------ แก้ไขใหม่
exports.repair = async (req, res, next) => {
    let { body } = req
    let result = []
    const date = moment().format('Y-M-D H:mm:ss')

    if (body.repair != '' && body.id != '') {
        req.getConnection((error, connection) => {
            if (error) throw error;
            let sql = `UPDATE todolists SET td_repair = '${body.repair}', td_upBy = '${body.username}', td_upDt = '${date}' , td_status = '1' WHERE td_id = '${body.id}' `
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                connection.destroy();
                res.send({ 'status': 'ok', 'result': results })
            });
        });
    } else {
        res.send({ 'status': 'Not-ok', 'result': result })
    }

}

exports.deleteList = async (req, res, next) => {
    let { body } = req
    let result = []
    const date = moment().format('Y-M-D H:mm:ss')
    if (body.username != '' && body.td_id != '') {
        req.getConnection((error, connection) => {
            if (error) throw error;
            let sql = `UPDATE todolists SET td_upBy = '${body.username}' , td_upDt = '${date}' , td_status = '9' WHERE td_id = '${body.td_id}' `
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                connection.destroy();
                res.send({ 'status': 'ok', 'result': results })
            });
        });
    } else {
        res.send({ 'status': 'Not-ok', 'result': result })
    }

}
