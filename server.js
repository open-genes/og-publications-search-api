import {getGenesList} from "./loaders/open-genes-api";
import {getPubmedPublicationsList} from "./loaders/pubmed-api";
const express = require('express');
const app = express();
const port = 8080;

app.post('/publication/all', (req, res) => {
  getGenesList((data) => {
    let symbols = [];
    data.forEach((data) => {
      symbols.push(data.symbol);
    });

    getPubmedPublicationsList((data) => {
      res.send(data);
    }, symbols )
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
