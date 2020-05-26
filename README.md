# OLA-Back

This is for use with the SYDE/BME ola requests system. It's a basic wrapper for the mySQL db that faculty/ staff can submit requests to, and OLAs can find these requests in.

## Use

It's your everyday semi-basic CRUD api.

| Route | Method | Request | Response | Notes |
| --- | --- | --- | --- | --- |
| /insert_entry | `POST` | JSON payload: `{headers: { 'Content-Type': 'application/json'}, body: {name: 'unspecified', contact: 'unspecified', request: 'unspecified', due: '2020-05-05'}}` | 200 | Each parameter is optional, adds a row entry with this info. Default values are listed in the payload |
| /query | `GET` | URL parameters: `query/?name='string'&due='date'&id='number'&contact='contact'` | A JSON string containing all entries satisfying your query | Each of the parameters is optional. No parameters returns all of the table's rows |
| /delete_entry | `DELETE` | JSON payload: `{headers: {'Content-Type': 'application/json'}, body: {id: 'integer'}}` | 200 | Deletes the row corresponding to the provided Id (the primary key of an entry) |

## Set up

Download all the npm packages with `npm install`.
I suggest running with [nodemon](https://nodemon.io/) so that it restarts when you make changes:
`npm install -g nodemon`
and then run the server with `nodemon server.js`

### DB setup

Make sure you have mySQL installed, you can follow the [publisher's instructions](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

Make sure you know your host, user, and password.
For local development host should be *localhost*, and user should be *root*. You set a root password when installing mySQL, so I'll leave you in charge of figuring that value out.

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
Then check that there's a database named __OLA_requests__ using
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
There should be 2 tables called __base_requests__ and __helpful_OLAs__.

If you want to know more about the schema for either table just run
```
DESCRIBE table_name
```
This will pull up some more information about the columns contained in the table.

Testing functionality with [OLA-front-shell](https://github.com/lglof/OLA-front-shell) (partially for the sake of learning about react and discovering new things)
