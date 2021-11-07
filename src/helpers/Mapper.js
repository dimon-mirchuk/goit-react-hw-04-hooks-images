const mapper = (images) => {
  return images.map(({ id, largeImageURL, webformatURL }) => ({
    id,
    largeImageURL,
    webformatURL,
  }));
};

export default mapper;
