const Request = require('../models/request.model')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty'
    })
  }

  const request = new Request({
    name: req.body.name,
    contact: req.body.contact,
    title: req.body.title,
    due: req.body.due,
    description: req.body.description,
    course: req.body.course
  })

  Request.create(request, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'An error occured while creating the request.'
      })
    } else res.send(data)
  })
}

exports.query = (req, res) => {
  Request.query(req.query, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'No requests found'
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving requests'
        })
      }
    } else res.send(data)
  })
}

exports.remove = (req, res) => {
  Request.remove(req.body.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Request with id ${req.query.id} not found`
        })
      } else {
        res.status(500).send({
          message: `Could not delete request number ${req.query.id}`
        })
      }
    } else res.send({ message: 'Request successfully deleted' })
  })
}
