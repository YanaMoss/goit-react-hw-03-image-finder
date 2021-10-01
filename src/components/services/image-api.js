import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22644758-91a56f4647f302f87ea071930';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  image_type: 'photo',
  key: API_KEY,
  per_page: 12,
};

const fetchImages = async ({ page, query, id }) => {
  return await axios.get('', {
    params: {
      page,
      q: query,
      id: id,
    },
  });
};

export default fetchImages;
