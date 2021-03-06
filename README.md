# OLA-Back

This is for use with the SYDE/BME ola requests system. It's a basic wrapper for the mySQL db that faculty/ staff can submit requests to, and OLAs can find these requests in.

## Use

It's your everyday semi-basic CRUD api.

### Requests

`/insert_entry`, `/query`, and `/delete_entry` all accept `archive: true` in the body of the request in order to interact with the archive database.

| Route         | Method   | Request                                                                                                                                                                                                      | Response                                                   | Notes                                                                                                                                                                                            |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /insert_entry | `POST`   | JSON payload: `{headers: { 'Content-Type': 'application/json'}, body: {name: 'unspecified', contact: 'unspecified', title: 'unspecified', due: '2020-05-05', description: 'string', course: 'course code'}}` | 200                                                        | Each parameter is optional, adds a row entry with this info. Default values are listed in the payload. DO NOT INSERT AN ENTRY DIRECTLY INTO THE ARCHIVE (I'm working on fixing that but for now) |
| /query        | `GET`    | URL parameters: `query/?name='string'&due='date'&id='number'&contact='contact'`                                                                                                                              | A JSON string containing all entries satisfying your query | Each of the parameters is optional. No parameters returns all of the table's rows                                                                                                                |
| /delete_entry | `DELETE` | JSON payload: `{headers: {'Content-Type': 'application/json'}, body: {id: 'integer'}}`                                                                                                                       | 200                                                        | Deletes the row corresponding to the provided Id (the primary key of an entry)                                                                                                                   |

### Errors

| Route           | Code | Message                                                                                                   | Notes                                                                      |
| --------------- | ---- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `/insert_entry` | 400  | Missing required fields                                                                                   | The request body is empty, or is missing the contact or description fields |
| `/insert_entry` | 201  | returns the inserted values                                                                               | it worked!                                                                 |
| `/query`        | 204  | no requests found                                                                                         | there's no requests matching the query                                     |
| `/query`        | 200  | returns the requests matching the query                                                                   | it worked!                                                                 |
| `/delete_entry` | 400  | no id provided                                                                                            | an id must be provided for the request to delete                           |
| `/delete_entry` | 404  | request with id # not found                                                                               | there's no request with the provided id in the db                          |
| `delete_entry`  | 200  | request successfully deleted                                                                              | it worked!                                                                 |
| any             | 500  | could not delete request number #, error retrieving requests, an error occured while creating the request | there was an internal server error                                         |

## Set up

Download all the npm packages with `npm install`.
I suggest running with [nodemon](https://nodemon.io/) so that it restarts when you make changes:
`npm install -g nodemon`
and then run the server with `nodemon server.js`

### DB setup

Make sure you have mySQL installed, you can follow the [publisher's instructions](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

Make sure you know your host, user, and password.
For local development host should be _localhost_, and user should be _root_. You set a root password when installing mySQL, so I'll leave you in charge of figuring that value out.

In the root of the project folder, create a file called '.env', and then in the folder you can store your secrets in this format:

```
VARIABLE_NAME=value
```

For example,

```
DB_HOST=localhost
DB_USER=root
DB_PASS=<your password here>
```

To seed the database return to your console and run:

```
node db/db_seed.js
node db/table_seed.js
```

To check that these commands have worked, enter your mySQL shell from the command line

```
mysql -u root -p
```

Then check that there's a database named **OLA_requests** using

```
SHOW DATABASES;
```

Navigate to that database with

```
USE OLA_requests
```

and check the tables using

```
SHOW TABLES;
```

There should be 2 tables called **base_requests** and **helpful_OLAs**.

If you want to know more about the schema for either table just run

```
DESCRIBE table_name
```

This will pull up some more information about the columns contained in the table.

Testing functionality with [OLA-front-shell](https://github.com/lglof/OLA-front-shell) (partially for the sake of learning about react and discovering new things)

## Logging

Logging is done with a combination of [morgan](https://github.com/expressjs/morgan) and [winston](https://github.com/winstonjs/winston).
They create logs of errors and requests which are available at `/logs/`.

Stretch goal: send these logs to mysql instead of dumping into a textfile.

## Serving

This should be running on the SYDE/BME server using [forever](https://www.npmjs.com/package/forever). They have a good documentation, worth checking out.

## Concerns

I'm not sure exactly how much use this app is going to get but we could run into issues with logging and archive table size. They could both end up too large.
I suggest making a timestamped copy of the logs once a week and dumping them into a different file (and then clearing the log within the repo)
The archive db could also end up being too large. I'm assuming it's possible to queue up the requests and pop out old ones so the queue stays a specific length.
