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

const table = 'new_requests'

Request.create = (newRequest, result) => {
  sql.query(`INSERT INTO ${table} SET ?`, newRequest, (err, res) => {
    if (err) {
      logger.error('error: ', err)
      return err
    }

    logger.info('created request: ', { id: res.insertId, ...newRequest })
    result(null, { id: res.insertId, ...newRequest })
    return null
  })
}

Request.query = (params, result) => {
  const keys = Object.keys(params)
  let sqlQ = `SELECT * FROM ${table}`
  for (let i = 0; i < keys.length; i += 1) {
    sqlQ += i > 0 ? ' AND' : ' WHERE'
    sqlQ += params[keys[i]].length ? ` ${keys[i]}='${params[keys[i]]}'` : ''
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

Request.remove = (id, result) => {
  if (!id) {
    result({ kind: 'no_id' }, null)
    return
  }

  sql.query(`DELETE FROM ${table} WHERE id = '${id}'`, (err, res) => {
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

    logger.info(`deleted request with id ${id}`)
    result(null, res)
  })
}

module.exports = Request
