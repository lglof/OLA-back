const sql = require('./db.js')

const Request = function (request) {
  this.name = request.name
  this.contact = request.contact
  this.request = request.request
  this.due = request.due
}

Request.create = (newRequest, result) => {
  sql.query('INSERT INTO base_requests SET ?', newRequest, (err, res) => {
    if (err) {
      console.log('error: ', err)
      return (err, null)
    }

    console.log('created request: ', { id: res.insertId, ...newRequest })
    result(null, { id: res.insertId, ...newRequest })
  })
}

Request.query = (params, result) => {
  console.log('model')
  var keys = Object.keys(params)
  console.log(params)
  var sqlQ = 'SELECT * FROM base_requests'
  for (var i = 0; i < keys.length; i += 1) {
    sqlQ += i > 0 ? ' AND' : ' WHERE'
    sqlQ += params[keys[i]].length ? ` ${keys[i]}='${params[keys[i]]}'` : ''
  }
  console.log(sqlQ)
  sql.query(sqlQ, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log(`found ${res.length} requests`)
      result(null, res)
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Request.remove = (id, result) => {
  sql.query(`DELETE FROM base_requests WHERE id = '${id}'`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows === 0) {
      result({ kind: 'not_found' }, null)
      return
    }

    console.log(`deleted request with id ${id}`)
    result(null, res)
  })
}

module.exports = Request
