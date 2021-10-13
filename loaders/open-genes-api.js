import {errorLogger} from "../utils/error-logger";

const axios = require('axios').default;
const config = {
  url: 'https://open-genes.com/api',
  doiUrl: 'https://plu.mx/api/v1/artifact/doi'
};

export function getGenesList(populateData) {
  axios
    .get(`${config.url}/gene`)
    .then((res) => {
      populateData(res.data);
    })
    .catch((err) => {
      errorLogger(err);
    });
}

export function getArticleDataByDoi(doi, article) {
  axios
      .get(`${config.doiUrl}/${doi}`)
      .then((res) => article(res.data))
      .catch((err) => {
        errorLogger(err);
      });
}

