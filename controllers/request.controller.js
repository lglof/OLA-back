const Request = require('../models/request.model')

exports.create = (req, res) => {
  if (!req.body || !req.body.contact || !req.body.description) {
    res.status(400).send({
      message: 'Missing Required Fields',
    })
  }

  const request = new Request({
    name: req.body.name,
    contact: req.body.contact,
    title: req.body.title,
    due: req.body.due,
    description: req.body.description,
    course: req.body.course,
  })

  Request.create(request, req.body.archive, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'An error occured while creating the request.',
      })
    } else res.status(201).send(data)
  })
}

exports.query = (req, res) => {
  Request.query(req, req.body.archive, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(204).send({
          message: 'No requests found',
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving requests',
        })
      }
    } else res.send(data)
  })
}

exports.remove = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: 'No id provided',
    })
  }
  Request.remove(req.body, req.body.archive, (err) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Request with id ${req.body.id} not found`,
        })
      } else {
        res.status(500).send({
          message: `Could not delete request number ${req.body.id}`,
        })
      }
    } else res.send({ message: 'Request successfully deleted' })
  })
}

exports.archive = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: 'No id provided',
    })
  }
  Request.archive(req.body.id, (err) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No active requests with id ${req.body.id}`,
        })
      } else {
        res.status(500).send({
          message: `Could not archive request number ${req.body.id}`,
        })
      }
    } else res.send({ message: 'Request successfully archived' })
  })
}
