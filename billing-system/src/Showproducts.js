import './Showproducts.css';
import {Link} from 'react-router-dom';
import React from 'react'
import axios from 'axios';
export default class Detials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
            products: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/fetch_products').then((result)=>{
            this.setState({
                products: result.data
              });
        })
      }
render(){
    const product = this.state.products.map(product => (
        <div style={{ border: "1px solid black" }} key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>Item Code: {product.item_code}</p>
          <p>HSN Code: {product.hsn_code}</p>
          <Link to={{pathname: `/updateproduct/${product._id}`, state: {value: this.state.value, product: product}}}>
                <h1>Update Product</h1>
            </Link>
        </div>
      ));
     
return (
    <div>
        {product}
        <div>
            <Link to={{pathname: "/addproducts", state: this.state.value}}>
                Add Product
            </Link>
            <Link to={{pathname: "/show", state: this.state.value}}>
                Back to bills
            </Link>
      </div>
    </div>
    )
}

}