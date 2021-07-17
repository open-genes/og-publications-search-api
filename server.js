import {getGenesList} from "./loaders/open-genes-api";
import {getPublicationsIdList, getPublicationsInIdsList} from "./loaders/pubmed-api";
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
    let geneSymbolsList = [];
    data.forEach((data) => {
      geneSymbolsList.push(data.symbol);
    });

    getPublicationsIdList(
      req.body.symbols.length !== 0
        ? req.body.symbols
        : geneSymbolsList,
      req.body.limit,
      (data) => {
      const publicationIdsList = data;

      getPublicationsInIdsList(
        publicationIdsList,
        (data) => {
          // Form an article object and a feed list
          const feed = [];
          Object.values(data.result).forEach((article) => {
            feed.push({
              uid: article.uid,
              url: `https://www.ncbi.nlm.nih.gov/pubmed/${article.uid}`,
              title: article.title,
              date: article.pubdate,
            });
          });

          // Check if gene symbol is mentioned in the title of an article
          const filteredFeed = feed.map(
            (article) => {
              const geneSymbol = new RegExp(geneSymbolsList.join("|")).test(article.sorttitle);
              if (geneSymbol.lastMatch !== null) {
                return {
                  gene: geneSymbol.lastMatch,
                  ...article
                };
              }
            }
          );

          // console.log('query');
          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

          // Request methods you wish to allow
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

          // Request headers you wish to allow
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

          // Set to true if you need the website to include cookies in the requests sent
          // to the API (e.g. in case you use sessions)
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.json(filteredFeed);
        })
    })
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
