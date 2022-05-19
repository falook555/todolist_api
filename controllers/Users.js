const jwt = require('jwt-simple')
const config = require('../config')
//var time = require('time');

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({
        fullname: user.usr_fname + ' ' + user.usr_lname,
        username: user.usr_username,
        image: user.usr_img
        // iat: timestamp
    },
        config.secret
    )
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}
