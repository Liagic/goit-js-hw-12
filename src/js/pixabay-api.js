import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '54728905-47b91fba438408292028d34aa';
export default async function getImagesByQuery(query, page) {
  const response = await axios.get('', {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}
