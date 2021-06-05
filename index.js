const express = require('express')
const app = express()

require('dotenv').config()
require('./config/auth')(app)
require('./config/view')(app)
require('./app/providers/route_service_provider')(app, express)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server Running on ${PORT}`))