const request = require('../controllers/request.controller')

module.exports = (app) => {
  app.post('/insert_entry', request.create)
  app.get('/query', request.query)
  app.delete('/delete_entry', request.remove)
  app.post('/archive_entry', request.archive)
}
