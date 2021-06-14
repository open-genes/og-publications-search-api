import {getGenesList} from "./loaders/open-genes-api";
const express = require('express');
const app = express();
const port = 8080;

app.post('/gene/genes', (req, res) => {
  getGenesList((data) => {
    let symbols = [];

    data.forEach((data) => {
      symbols.push(data.symbol);
    });

    res.send(symbols);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
