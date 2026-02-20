import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '54728905-47b91fba438408292028d34aa';
export default function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(error => error.message);
}
