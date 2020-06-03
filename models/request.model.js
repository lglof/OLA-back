const sql = require('./db.js')
const logger = require('../config/winston')

// eslint-disable-next-line func-names
const Request = function (request) {
  this.name = request.name
  this.contact = request.contact
  this.title = request.title
  this.due = request.due
  this.description = request.description
  this.course = request.course
}

function whichTable(archive) {
  if (archive) {
    return 'archive_requests'
  }
  return 'new_requests'
}

Request.create = (newRequest, archive, result) => {
  sql.query(
    `INSERT INTO ${whichTable(archive)} SET ?`,
    newRequest,
    (err, res) => {
      if (err) {
        logger.error('error: ', err)
        return err
      }

      logger.info('created request: ', { id: res.insertId, ...newRequest })
      result(null, { id: res.insertId, ...newRequest })
      return null
    }
  )
}

Request.query = (req, archive, result) => {
  let sqlQ = `SELECT * FROM ${whichTable(archive)}`
  const keys = Object.keys(req.params)
  for (let i = 0; i < keys.length; i += 1) {
    sqlQ += i > 0 ? ' AND' : ' WHERE'
    sqlQ += req.params[keys[i]].length
      ? ` ${keys[i]}='${req.params[keys[i]]}'`
      : ''
  }
  sql.query(sqlQ, (err, res) => {
    if (err) {
      logger.error('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      logger.info(`found ${res.length} requests`)
      result(null, res)
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Request.remove = (body, archive, result) => {
  sql.query(
    `DELETE FROM ${whichTable(archive)} WHERE id = '${body.id}'`,
    (err, res) => {
      if (err) {
        logger.error('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows === 0) {
        logger.info('no records found')
        result({ kind: 'not_found' }, null)
        return
      }

      logger.info(`deleted request with id ${body.id}`)
      result(null, res)
    }
  )
}

Request.archive = (id, result) => {
  const moveQuery = `INSERT INTO archive_requests SELECT * FROM new_requests WHERE id=${id}`
  const cleanQuery = `DELETE FROM new_requests WHERE id=${id}`

  sql.query(moveQuery, (err, res) => {
    if (err) {
      logger.error('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows === 0) {
      logger.info('no records found')
      result({ kind: 'not_found' }, null)
      return
    }
    logger.info(`moved request with id ${id}`)
    sql.query(cleanQuery, (error, response) => {
      if (error) {
        logger.error('error: ', error)
        result(null, error)
        return
      }
      if (response.affectedRows === 0) {
        logger.info('no records found')
        result({ kind: 'not_found' }, null)
        return
      }
      logger.info(`Deleted active request with id ${id}`)
      result(null, response)
    })
  })
}
module.exports = Request
