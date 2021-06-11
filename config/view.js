const exphbs = require('express-handlebars')

module.exports = (app, express) => {
    app.use(express.static('public'))

    app.engine('hbs', exphbs({
        // defaultLayout: 'auth',
        extname: '.hbs',
        helpers:{
            section:function(name, options){
                if(!this._sections){this._sections = {}}
                this._sections[name] = options.fn(this);
                return null
            }
        }
    }))
    app.set('view engine', 'hbs')
    app.set('views','./resources/views')
}