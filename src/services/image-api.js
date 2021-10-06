import axios from 'axios';

const BASE_URL = 'http://pixabay.com/api';
const API_KEY = '23643483-d75e612401c1d9a4094e2335a';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  image_type: 'photo',
  key: API_KEY,
  per_page: 12,
};

const fetchImages = async ({ page, query }) => {
  return await axios.get('', {
    params: {
      page,
      q: query,
    },
  });
};

const fetchImageId = async ({ id }) => {
  return await axios.get('', {
    params: {
      id: id,
    },
  });
};

export { fetchImages, fetchImageId };
