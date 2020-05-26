module.exports = app => {
  const request = require('../controllers/request.controller')

  app.post('/insert_entry', request.create)
  app.get('/query', request.query)
  app.delete('/delete_entry', request.remove)
}
