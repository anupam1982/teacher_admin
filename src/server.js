const express = require('express')
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig');

const registerRouter = require('../src/Routes/register');
const commonlistRouter = require('../src/Routes/commonlist');
const suspendRouter = require('../src/Routes/suspend');
const notificationsRouter = require('../src/Routes/notification');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json', strict: false }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

const connection = require('../src/Helpers/connection');
const query = require('../src/Helpers/query');
  

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', async (req, res) => {
    const conn = await connection(dbConfig).catch(e => {});
    const results = await query(conn, 'SELECT * FROM teachers').catch(console.log);
    res.json({ results });
  })    

app.use('/api/register', registerRouter);
app.use('/api/commonstudents', commonlistRouter);
app.use('/api/suspend', suspendRouter);
app.use('/api/retrievefornotifications', notificationsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))