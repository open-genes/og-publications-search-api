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

```json
{
    "symbols": <string[]>,
    "limit": <number>
}
```

##### Example:
```json
{
    "symbols": ["IL15RA", "APOC3"],
    "limit": 2
}
```

Returns a list of the publications found for all of the genes in the database. <br>If `limit` is set to `0`, there is no limit for publications in response. |

---
