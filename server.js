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
      geneSymbolsList.push(data.symbol.toLowerCase());
    });

    getPublicationsIdList(
      typeof req.body.symbols !== undefined  && req.body.symbols.length !== 0
        ? req.body.symbols
        : geneSymbolsList,
      req.body.limit,
      (data) => {
      const publicationIdsList = data;

      console.log(req.body.symbols);

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
              sortTitle: article.sorttitle,
              date: article.pubdate,
            });
          });

          // Check if gene symbol is mentioned in the title of an article
          const filteredFeed = feed.map(
            (article) => {
              const re = new RegExp(`${geneSymbolsList.join("|")}/gmi`);
              const match = re.exec(article.sortTitle);
              console.log(`/${geneSymbolsList.join("|")}/gmi`);

              if (match !== null) {
                return {
                  gene: match[0],
                  ...article
                };
              }

              return article;
            }
          );

          // console.log(filteredFeed);
          // console.log('query');
          // Website you wish to allow to connect
          res.header('Access-Control-Allow-Origin', '*');

          // Request methods you wish to allow
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

          // Request headers you wish to allow
          res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

          // Set to true if you need the website to include cookies in the requests sent
          // to the API (e.g. in case you use sessions)
          res.header('Access-Control-Allow-Credentials', true);
          res.json(filteredFeed);
        })
    })
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
