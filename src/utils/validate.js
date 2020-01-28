const isEmpty = ({ name, description, price, category, image, color }) => {
  name = name.trim();
  description = description.trim();
  category = category.trim();
  image = image.trim()
  color = color.trim()

  if (!name || !description || !price || !category || !image || !color) {
    return true;
  }
  return false;
};

const isNumber = ({ price }) => {
  price = parseFloat(price, 10);
  if (typeof price !== 'number') {
    return false
  }
  return true
}

const isUrl = ({ image }) => {
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return urlRegex.test(image);
}

export {
  isEmpty,
  isNumber,
  isUrl
}