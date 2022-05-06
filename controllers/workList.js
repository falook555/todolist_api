const moment = require('moment')

exports.getAll = (req, res, next) => {

    let username = req.params.username
    // console.log(username)
    req.getConnection((err, connection) => {
        if (err) return console.log(error)

        try {
            let sql = `SELECT * FROM work_list where td_username = '${username}' and td_status <> 9 ORDER BY td_id DESC`;
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

    // console.log(body)
    // console.log(date)
    if (body.username != '' && body.going != '' && body.doing != '') {
        req.getConnection((err, connection) => {
            if (err) return console.log(error)
            result = connection.query(`INSERT INTO work_list(td_username, td_content, td_dept, td_insBy, td_insDt, td_status)
        VALUES ('${body.username}','${body.doing}','${body.going}','${body.username}','${date}','0')`)
            // console.log(result != '' ? 'Ins-success' : 'Ins-fail')
        })
        res.send({ 'status': 'ok', 'result': result })
    } else {
        // console.log('fail-No-data')
        res.send({ 'status': 'Not-ok', 'result': result })
    }

}


exports.upStatusWork = async (req, res, next) => {
    let { body } = req
    let result = []
    // console.log(body)
    const date = moment().format('Y-M-D H:mm:ss')

    if (body.username != '' && body.td_id != '') {
        req.getConnection((err, connection) => {
            if (err) return console.log(error)
            let sql = `UPDATE work_list SET td_upBy = '${body.username}' , td_upDt = '${date}' , td_status = '1' WHERE td_id = '${body.td_id}' `
            result = connection.query(sql)
            // console.log(result != '' ? 'Update-success' : 'Update-fail')
            // console.log(sql)
        })
        res.send({ 'status': 'ok', 'result': result })
    } else {
        // console.log('fail-No-data')
        res.send({ 'status': 'Not-ok', 'result': result })
    }

}

exports.deleteList = async (req, res, next) => {
    let { body } = req
    let result = []
    const date = moment().format('Y-M-D H:mm:ss')

    if (body.username != '' && body.td_id != '') {
        req.getConnection((err, connection) => {
            if (err) return console.log(err)
            result = connection.query(`UPDATE work_list SET td_upBy = '${body.username}' , td_upDt = '${date}' , td_status = '9' WHERE td_id = '${body.td_id}' `)
        })
        res.send({ 'status': 'ok', 'result': result })
    } else {
        // console.log('fail-No-data')
        res.send({ 'status': 'Not-ok', 'result': result })
    }

}
