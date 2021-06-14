import {getGenesList} from "./loaders/open-genes-api";
import {getPubmedPublicationsList} from "./loaders/pubmed-api";
const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/publication/all', (req, res) => {
  getGenesList((data) => {
    let symbols = [];
    data.forEach((data) => {
      symbols.push(data.symbol);
    });

    getPubmedPublicationsList((data) => {
      res.send(data);
    },
      req.body.symbols.length !== 0
        ? req.body.symbols
        : symbols,
      req.body.limit)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
