import {getGenesList} from "./loaders/open-genes-api";
import {getPublicationsIdList, getPublicationsInIdsList} from "./loaders/pubmed-api";
import {getArticleDataByDoi} from './loaders/plumx-api';
import {errorLogger} from "./utils/error-logger";

const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const cache = require('memory-cache');
const crypto = require('crypto');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Catch bodyParser errors occurring while parsing invalid JSON in requests
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        errorLogger(error, 'Express bodyParser error');
        res.sendStatus(500);
    } else {
        next();
    }
});

// Configure cache middleware
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        const currentDate = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        const hash = crypto.createHash('md5').update(`${currentDate}${random}`).digest("hex");
        let key = `__search__${hash}`;
        let cacheContent = memCache.get(key);
        if (cacheContent) {
            res.send(cacheContent);
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

// App routes
// TODO: transfer all the logic into the module
app.post('/publication/all', cacheMiddleware(30), (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const symbols = req.body.symbols !== undefined
            ? req.body.symbols :
            geneSymbolsList;
        const keywords = req.body.keywords !== undefined
            ? req.body.keywords :
            ['aging'];
        const portion = 10;
        const limit = req.body.limit !== undefined
            ? req.body.limit
            : portion;
        let page = 1;
        if (req.body.page !== undefined) {
            if (!Number.isSafeInteger(page) || page === 0) {
                page = 1;
            } else {
                page =req.body.page;
            }
        }

        getGenesList((data) => {
            let geneSymbolsList = [];
            data.forEach((data) => {
                geneSymbolsList.push(data.symbol.toLowerCase());
            });
            getPublicationsIdList(
                symbols,
                keywords,
                limit,
                (data) => {
                    console.log(limit, page);
                    const publicationIdsList = data;

                    getPublicationsInIdsList(
                        publicationIdsList,
                        (data) => {
                            // Form an article object and a feed list
                            const feed = [];

                            // TODO: handle error in getPublicationsInIdsList when Esummary API returns esummaryresult: [ 'Empty id list - nothing todo' ]
                            if (data.result === undefined) {
                                res.sendStatus(500);
                            } else {
                                Object.values(data.result).forEach((article) => {
                                    /* structure:
                                      [
                                        { ...article },
                                        { ...article },
                                        [ '33733001', '33650673' ]
                                      ]
                                    */

                                    if (article.hasOwnProperty('uid')) {
                                        feed.push({
                                            uid: article.uid,
                                            url: `https://www.ncbi.nlm.nih.gov/pubmed/${article.uid}`,
                                            title: article.title,
                                            sortTitle: article.sorttitle,
                                            date: new Date(article.pubdate).getTime(),
                                        });
                                    }
                                });

                                // Check if gene symbol is mentioned in the title of an article.
                                // Exclude them from response if not and add a gene symbol to response.
                                const re = new RegExp(`${geneSymbolsList.join("|")}/gmi`);

                                const filteredFeed = feed.filter(
                                    (article) => {
                                        if (re.exec(article.sortTitle) !== null) {
                                            return article
                                        }
                                    }).map(
                                    (article) => {
                                        const match = re.exec(article.sortTitle);
                                        if (match !== null) {
                                            return {
                                                gene: match[0],
                                                ...article
                                            };
                                        }
                                    }
                                );

                                const startIndex = Math.ceil((page - 1) * portion);
                                const endIndex = startIndex + portion;

                                try {
                                    const result = {
                                        total: filteredFeed.length,
                                        page: page,
                                        items: [...filteredFeed.slice(startIndex, endIndex)],
                                    };
                                    res.json(result);

                                    console.log(
                                        `\n--- New search --- \n`,
                                        `total: ${filteredFeed.length} \n`,
                                        `symbols:${symbols} \n`,
                                        `keywords:${keywords} \n`,
                                        `limit: ${limit} \n`,
                                        `page: ${page} of ${Math.ceil(filteredFeed.length / portion)}`
                                    );
                                } catch (err) {
                                    errorLogger(err);
                                    res.sendStatus(500);
                                }
                            }
                        })
                })
        });
    } else {
        console.log(req.body);
        errorLogger(500);
    }
});

app.get('/publication/getInfoByDOI', cacheMiddleware(30), (req, res) => {
    const doi = req.query.doi;
    if (doi) {
        getArticleDataByDoi(doi, (article) => res.json(article))
    } else {
        errorLogger(500);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
