import {errorLogger} from "../utils/error-logger";

const axios = require('axios').default;
const config = {
    url: 'https://plu.mx/api/v1/artifact/doi'
};

export function getArticleDataByDoi(doi, article) {
    axios
        .get(`${config.doiUrl}/${doi}`)
        .then((res) => article(res.data))
        .catch((err) => {
            errorLogger(err);
        });
}
