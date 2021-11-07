import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "23364798-13e999d1bd4f00c21ed04ef58";

export const getImages = ({ query, page }) =>
  axios
    .get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
