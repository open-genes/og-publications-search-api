# Open Genes Publication Search API

https://publications-search-api-2yf55.ondigitalocean.app/

## Local build
```
npm i
```
```
npm run start
```
http://localhost:8080

## Deployment
Every push to master runs a deployment to Digital Ocean App Platform.

## Endpoints

**`POST` [/publication/all](https://publications-search-api-2yf55.ondigitalocean.app/publication/all)**
<br>`raw`&nbsp;`JSON` 

```
{
    "symbols": <string[]>,  (required)
    "limit": <number>       (required)
    "page": <number>        (optional)
}
```

##### Request example:
```json
{
    "symbols": ["IL15RA", "APOC3"],
    "limit": 2,
    "page": 1
}
```

Returns a list of the publications found for all of the genes in the database.

If `symbols` array is empty, an app will create its own genes list. <br>
If `limit` is set to `0`, an app will set it to default — `10`. <br>
Esummary API returns error when there is no limit specified.


##### Response example:
```json
{
    "total": 1,
    "page": 1,
    "items": [
        {
            "gene": "stat3",
            "uid": "34141151",
            "url": "https://www.ncbi.nlm.nih.gov/pubmed/34141151",
            "title": "Promotion effects of DEHP on hepatocellular carcinoma models: up-regulation of PD-L1 by activating the JAK2/STAT3 pathway.",
            "sortTitle": "promotion effects of dehp on hepatocellular carcinoma models up regulation of pd l1 by activating the jak2 stat3 pathway",
            "date": 1619816400000
        }
  ]
}
```
