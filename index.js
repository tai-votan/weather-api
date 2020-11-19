const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const { email, password } = req.query;
  res.json({ email, password, author: "Jane Doe", })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
