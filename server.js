import {getGenesList} from "./loaders/open-genes-api";
import {getPublicationsIdList, getPublicationsInIdsList} from "./loaders/pubmed-api";

const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/publication/all', (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    getGenesList((data) => {
      let geneSymbolsList = [];
      data.forEach((data) => {
        geneSymbolsList.push(data.symbol.toLowerCase());
      });
      console.log(req.body);
      getPublicationsIdList(
        req.body.symbols !== undefined
          ? req.body.symbols :
          geneSymbolsList,
        req.body.limit !== undefined
          ? req.body.limit
          : 0,
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

                  if (match !== null) {
                    return {
                      gene: match[0],
                      ...article
                    };
                  }

                  return article;
                }
              );

              res.json(filteredFeed);
            })
        })
    });
  } else {
    console.log(req.body);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
