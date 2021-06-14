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
| Method | Route | Request body | Description |
|--------|-------|--------------|-------------|
| POST | /publication/all | none | get a list of the publications found for all of the genes in the database |
