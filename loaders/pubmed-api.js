import {errorLogger} from "../utils/error-logger";
const axios = require('axios').default;
const config = {
  url: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
  params: 'db=pubmed&retmode=json'
};

// TODO: DRY with a common class and constructor
export function getPublicationsIdList(symbolsList, limit, populateData) {
  let symbolsQuery = '';
  symbolsList.forEach((gene, index, array) => {
    symbolsQuery += `${gene}[Title]`;
    symbolsQuery += index < array.length - 1 ? "+OR+" : ""; // concat genes' HGNC in the request
  });

  axios
    .get(`${config.url}/esearch.fcgi?${
      config.params
    }&retmax=${limit}&term=${symbolsQuery}&datetype=pdat&reldate=180`)
    .then((res) => {
      populateData(res.data.esearchresult.idlist);
    })
    .catch((err) => errorLogger(err));
}

export function getPublicationsInIdsList(idlist, populateData) {
  axios
    .get(`${config.url}/esummary.fcgi?${config.params}&id=${idlist}`)
    .then((res) => {
      populateData(res.data);
    })
    .catch((err) => errorLogger(err));
}
