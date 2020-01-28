import axios from 'axios';

const createProduct = async ({ name, description, price, category, image, color }) => {
  price = parseFloat(price, 10);
  const product = await axios.post('https://ven10product.herokuapp.com/products', {
    name,
    description,
    price,
    category,
    image,
    color
  });

  return product
}

export default createProduct;