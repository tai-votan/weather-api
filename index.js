const express = require('express');
const app = express();
const port = 6600;

app.get('/', (req, res) => {
  const { email, password } = req.query;
  res.json({ email, password })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
