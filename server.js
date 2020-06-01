const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

const port = process.env.PORT || 5000

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS VERY CONNECTED TO REACT' })
})

require('./routes/request.routes')(app)

app.listen(port, () => console.log(`Server is running on port ${port}`))
