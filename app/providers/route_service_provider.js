const cookieParser = require('cookie-parser')

module.exports = (app, express) => {
    //parse form data
    app.use(express.urlencoded({extended: true}))
    //parse json data
    app.use(express.json())
    //parse cookies from the HTTP Request
    app.use(cookieParser());

    //api routes
    app.use('/api/admin', require('../../routes/api/admin'))
    app.use('/api/user', require('../../routes/api/user'))
    app.use('/api/auth', require('../../routes/api/auth'))
    app.use('/api', require('../../routes/api'))
    //web routes
    app.use('/admin', require('../../routes/web/admin'))
    app.use('/user', require('../../routes/web/user'))
    app.use('/auth', require('../../routes/web/auth'))
    app.use('/', require('../../routes/web'))
}