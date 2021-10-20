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

---


**`GET` [/publication/getInfoByDOI/?doi=*DOI*](https://publications-search-api-2yf55.ondigitalocean.app/publication/getInfoByDOI/?doi=10.1093/gerona/glx257)**
<br>query parameter `doi` takes an article DOI, example: `10.1093/gerona/glx257`

##### Request example:
[https://publications-search-api-2yf55.ondigitalocean.app/publication/getInfoByDOI/?doi=10.1093/gerona/glx257](https://publications-search-api-2yf55.ondigitalocean.app/publication/getInfoByDOI/?doi=10.1093/gerona/glx257)

Returns a scientific publication metadata by DOI.

##### Response example:

```json
{
  "identifier": {
    "pmid": [
      {
        "link": "http://www.ncbi.nlm.nih.gov/pubmed/29346516",
        "value": "29346516"
      }
    ],
    "doi": [
      {
        "link": "http://doi.org/10.1093/gerona/glx257",
        "value": "10.1093/gerona/glx257"
      }
    ],
    "url_id": [
      "http://www.scopus.com/inward/record.url?partnerID=HzOxMe3b&scp=85048808100&origin=inward",
      "http://dx.doi.org/10.1093/gerona/glx257",
      "http://www.ncbi.nlm.nih.gov/pubmed/29346516",
      "https://academic.oup.com/biomedgerontology/article/73/7/882/4807477",
      "http://academic.oup.com/biomedgerontology/article-pdf/73/7/882/25044787/glx257.pdf",
      "https://mouseion.jax.org/stfbaop/59",
      "https://mouseion.jax.org/cgi/viewcontent.cgi?article=1058&amp;context=stfbaop",
      "https://mouseion.jax.org/stfb2018/137",
      "https://mouseion.jax.org/cgi/viewcontent.cgi?article=1140&amp;context=stfb2018",
      "https://doi.org/10.1093/gerona/glx257",
      "https://dx.doi.org/10.1093/gerona/glx257",
      "https://academic.oup.com/biomedgerontology/advance-article/doi/10.1093/gerona/glx257/4807477",
      "https://academic.oup.com/biomedgerontology/advance-article-pdf/doi/10.1093/gerona/glx257/23734523/glx257.pdf",
      "http://academic.oup.com/biomedgerontology/advance-article-pdf/doi/10.1093/gerona/glx257/23734523/glx257.pdf",
      "https://academic.oup.com/biomedgerontology/article-pdf/73/7/882/25044787/glx257.pdf"
    ],
    "repo_url": [
      "https://mouseion.jax.org/stfbaop/59",
      "https://mouseion.jax.org/stfb2018/137"
    ]
  },
  "most_recent_metrics_evidence": {
    "twitter": {
      "ref_id": {
        "type": "url",
        "link": "http://academic.oup.com/biomedgerontology/advance-article/doi/10.1093/gerona/glx257/4807477",
        "value": "http://academic.oup.com/biomedgerontology/advance-article/doi/10.1093/gerona/glx257/4807477"
      },
      "id": "952133136258707457",
      "title": {
        "link": "http://twitter.com/humanageing/statuses/952133136258707457"
      }
    }
  },
  "plum_print_counts": {
    "usage": {
      "total": 116,
      "name": "usage"
    },
    "capture": {
      "total": 7,
      "name": "capture"
    },
    "citation": {
      "total": 11,
      "name": "citation"
    },
    "social_media": {
      "total": 1,
      "name": "socialMedia"
    }
  },
  "request_id": "10.1093/gerona/glx257",
  "artifact_type": "ARTICLE",
  "sort_count": {
    "usage": {
      "count_types": [
        {
          "sources": [
            {
              "total": 95,
              "name": "EBSCO"
            },
            {
              "total": 12,
              "name": "Digital Commons",
              "uri": "https://mouseion.jax.org/stfbaop/59"
            },
            {
              "total": 8,
              "name": "Digital Commons",
              "uri": "https://mouseion.jax.org/stfb2018/137"
            }
          ],
          "total": 115,
          "name": "ABSTRACT_VIEWS"
        },
        {
          "sources": [
            {
              "total": 1,
              "name": "EBSCO"
            }
          ],
          "total": 1,
          "name": "LINK_OUTS"
        }
      ],
      "1year_rank": 39,
      "total": 116,
      "name": "usage",
      "3year_rank": 30
    },
    "capture": {
      "count_types": [
        {
          "sources": [
            {
              "total": 6,
              "name": "Mendeley",
              "uri": "https://www.mendeley.com/catalogue/16c304e9-848f-3a26-84bc-e533c8237f8d"
            }
          ],
          "total": 6,
          "name": "READER_COUNT"
        },
        {
          "sources": [
            {
              "total": 1,
              "name": "EBSCO"
            }
          ],
          "total": 1,
          "name": "EXPORTS_SAVES"
        }
      ],
      "1year_rank": 0,
      "total": 7,
      "name": "capture",
      "3year_rank": 0
    },
    "citation": {
      "count_types": [
        {
          "sources": [
            {
              "total": 11,
              "name": "Scopus",
              "uri": "https://www.scopus.com/inward/citedby.uri?partnerID=HzOxMe3b&scp=85048808100&origin=inward"
            }
          ],
          "total": 11,
          "name": "CITED_BY_COUNT"
        }
      ],
      "1year_rank": 41,
      "total": 11,
      "name": "citation",
      "3year_rank": 28
    },
    "social_media": {
      "count_types": [
        {
          "sources": [
            {
              "total": 1,
              "name": "Twitter",
              "ref_id": "http://academic.oup.com/biomedgerontology/advance-article/doi/10.1093/gerona/glx257/4807477"
            }
          ],
          "total": 1,
          "name": "TWEET_COUNT",
          "links": [
            {
              "href": "http://plum-api/displayApi/1/artifacts/doi/10.1093/gerona/glx257?auth=C6715iu7PSsy-gvnFTZZgLOs&/metricsEvidence/twitter",
              "rel": "metricsEvidence/twitter"
            }
          ]
        }
      ],
      "1year_rank": 33,
      "total": 1,
      "name": "socialMedia",
      "3year_rank": 34
    }
  },
  "document_type": "ARTIFACT",
  "bibliographic_data": {
    "publisher": "Oxford University Press (OUP)",
    "artifact_title": "Deletion of Nrip1 Extends Female Mice Longevity, Increases Autophagy, and Delays Cell Senescence",
    "start_page": "882",
    "description": "Using age of female sexual maturation as a biomarker, we previously identified nuclear receptor interacting protein 1 (Nrip1) as a candidate gene that may regulate aging and longevity. In the current report, we found that the deletion of Nrip1 can significantly extend longevity of female mice (log-rank test, p =.0004). We also found that Nrip1 expression is altered differently in various tissues during aging and under diet restriction. Remarkably, Nrip1 expression is elevated with aging in visceral white adipose tissue (WAT), but significantly reduced after 4 months of diet restriction. However, in gastrocnemius muscle, Nrip1 expression is significantly upregulated after the diet restriction. In mouse embryonic fibroblasts, we found that the deletion of Nrip1 can suppress fibroblast proliferation, enhance autophagy under normal culture or amino acid starvation conditions, as well as delay oxidative and replicative senescence. Importantly, in WAT of old animals, the deletion of the Nrip could significantly upregulate autophagy and reduce the number of senescent cells. These results suggest that deleting Nrip1 can extend female longevity, but tissue-specific deletion may have varying effects on health span. The deletion of Nrip1 in WAT may delay senescence in WAT and extend health span.",
    "tags": [
      "Biochemistry, Genetics and Molecular Biology",
      "Medicine",
      "Life Sciences",
      "Medicine and Health Sciences"
    ],
    "issn": "1758535X",
    "publication_title": "Journals of Gerontology - Series A Biological Sciences and Medical Sciences",
    "publication_year": "2018",
    "volume": "73",
    "page_range": "882-892",
    "authors": [
      "Wang, Jinyu",
      "Chen, Xundi",
      "Osland, Jared",
      "Gerber, Skyler J",
      "Luan, Chao",
      "Delfino, Kristin",
      "Goodwin, Leslie",
      "Yuan, Rong"
    ],
    "publication_date": "2018-06-14T00:00:00.000Z+0000",
    "issue": "7",
    "end_page": "892"
  },
  "id": "3sr4wFyJnAAzELNPjokWyVqsvt5wZdg6Q-_Q6odhVlY"
}
```


