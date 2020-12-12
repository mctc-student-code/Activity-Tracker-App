let express = require ('express')

let bodyParser = require('body-parser')
let api_routes = require ('./routes/recordapi.js')

let app = express()

app.use(bodyParser.json())

app.use('./api',api_routes)

let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port', server.address().port )
})