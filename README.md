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
Every push to master runs a deployment to Digital Ocean apps storage.

## Endpoints

**`POST` [/publication/all](https://publications-search-api-2yf55.ondigitalocean.app/publication/all)**
<br>`raw`&nbsp;`JSON` 

```
{
    "symbols": <string[]>,
    "limit": <number>
}
```

##### Request example:
```json
{
    "symbols": ["IL15RA", "APOC3"],
    "limit": 2
}
```

Returns a list of the publications found for all of the genes in the database. <br>If `limit` is set to `0`, there is no limit for publications in response. |

##### Response example:
```json
[
    {
        "uid": "34102208",
        "url": "https://www.ncbi.nlm.nih.gov/pubmed/34102208",
        "title": "N-acetylcysteine alleviates ocular surface damage in STZ-induced diabetic mice by inhibiting the ROS/NLRP3/Caspase-1/IL-1β signaling pathway.",
        "date": "2021 Jun 5"
    }
]
```
