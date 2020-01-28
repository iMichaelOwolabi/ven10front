import React, { Component, Fragment } from 'react';
import './App.css'
import createProduct from './utils/axiosHelper';
import { isEmpty, isNumber, isUrl } from './utils/validate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      product: {
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        color: '',
      },
      data: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.createProductHandler = this.createProductHandler.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { product } = this.state;
    const { name, value } = e.target;
    product[name] = value;
    this.setState({
      product
    })
  };

   async createProductHandler(e){
    e.preventDefault();
    this.setState({
      loading: true
    });

    const { product } = this.state;
    if (isEmpty(product)) {
      return this.setState({
        loading: false,
        error: "All fields are required"
      })
    }

    if (!isNumber(product)) {
      return this.setState({
        loading: false,
        error: "Price must be a valid number"
      })
    }

    if (!isUrl(product)) {
      return this.setState({
        loading: false,
        error: "Image must be a valid url"
      })
    }

    const response = await createProduct(product);
    if (response.error) {
      return this.setState({
        loading: false,
        error: response.data.message,
      })
    }
    return this.setState({
      loading: false,
      error: false,
      data: response.data.data[0]
    })
  }

  render(){
    const { error } = this.state;
    let imgUrl = 'https://edustralia.com/wp-content/uploads/2019/08/placeholder.png';
    const { name, description, price, category, image, color } = this.state.product;
    const { data } = this.state;
    let preview  = (
      <Fragment>
        <img src={imgUrl} alt="placeholder"/>
        <div className="description">
        </div>
      </Fragment>
    )
      console.log(data, data.length, typeof data)
    if (data.name) {
      preview = (
        <Fragment>
        <img src={data.image} alt="placeholder"/>
        <div className="description">
          <h1>{data.name}</h1>
          <h3>{data.description}</h3>
          <p><span>Category:</span> {data.category}</p>
          <p><span>Color:</span> {data.color}</p>
          <p><span>Price:</span> $ {data.price}</p>
        </div>
      </Fragment>
      )
    }
    let buttonText = 'Add Product';
    if (this.state.loading) {
      buttonText = 'Loading...'
    }
    
    return(
        <div className="container">
          <h2>Ven10</h2>
          <div className="product">
            <div className="add-product">
              <form>
                <p><label>Product Name</label> <input type="text" name="name" required value={name} onChange={this.handleChange}/></p>
                <p><label>Description</label> <input type="text" name="description" value={description} required onChange={this.handleChange}/></p>
                <p><label>Price</label> <input type="number" name="price" required value={price} onChange={this.handleChange}/></p>
                <p><label>Category</label> <input type="text" name="category" required value={category} onChange={this.handleChange}/></p>
                <p><label>Image URL</label> <input type="text" name="image" required value={image} onChange={this.handleChange}/></p>
                <p><label>Color</label> <input type="text" name="color" required value={color} onChange={this.handleChange}/></p>
                <p className="error">{error}</p>
                <button type="submit" disabled={this.state.loading} onClick={this.createProductHandler}>{buttonText}</button>
              </form>
            </div>

            <div className="preview">
              {preview}
            </div>
          </div>
        </div>
    );
  }
}

export default App;
