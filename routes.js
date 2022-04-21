

const passport = require('passport')
const passportService = require('./service/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const users = require('./controllers/Users')
const Post = require('./controllers/Post/post_run')
const workList = require('./controllers/workList')



// const MailSend = require('./controllers/MailSend/Index')




module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send("<h1 style='text-align:center;margin-top:150px; '>todoList Api</h1>")
    })
    app.post('/signin', requireSignin, users.signin)
 

    app.get('/get-work-all/:username',workList.getAll)

}
