const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const app = express()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/access.log'),
  { flags: 'a' }
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))

const port = process.env.PORT || 5000

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS VERY CONNECTED TO REACT' })
})

require('./routes/request.routes')(app)

app.listen(port, () => console.log(`Server is running on port ${port}`))
