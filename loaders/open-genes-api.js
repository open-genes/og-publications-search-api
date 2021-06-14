const axios = require('axios').default;
const config = {
  url: 'https://open-genes.com/api'
};

export function getGenesList(populateData) {
  axios
    .get(`${config.url}/gene`)
    .then((res) => {
      populateData(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

