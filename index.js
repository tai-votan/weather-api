// const express = require('express');
// const cors = require('cors');
//
// const app = express();

const https = require('https');

const port = process.env.PORT || 8080;
//
// app.use(cors())
//
// app.use(function (req, res, next) {
//
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//
//   // Pass to next layer of middleware
//   next();
// });
//
//
//
// app.get('/', (req, res) => {
//   const { email, password } = req.query;
//   res.json({ email, password, author: "Jane Doe", })
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/api', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header('Access-Control-Allow-Credentials', true);
  const { query, path, id } = req.query;

  if (!query && !id) {
    res.json([])
  }
  let queryUrl = `${path}/?query=${query}`;
  if (id) {
    queryUrl = `${path}/${id}/`
  }

  const requestUrl = `https://www.metaweather.com/api/${queryUrl}`;
  https.get(requestUrl, (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.json(JSON.parse(data))
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
})

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
})
