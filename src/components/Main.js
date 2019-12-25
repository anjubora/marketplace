import React, { Component } from 'react';

class Main extends Component {
    constructor(props)
    {
      super(props);
      this.state={
          productName:"",
          price:""
      }
    }
    productInputHandler=(event)=>{

        const name=event.target.value;
        this.setState({productName:name})
    }
    priceInputHandler=(event)=>{
        const price=event.target.value;
        this.setState({price:price})

    }
    createProduct=(event)=>{
            event.preventDefault();
       
           const name=this.state.productName;
           const priceInwei=window.web3.utils.toWei(this.state.price,'ether')
           console.log(name,priceInwei)
           this.props.createProduct(name,priceInwei)
    }


    render() {
      return (
         
          <div  className="container" style={{color :"green"}}>
            <h1>Add product</h1>

            <form onSubmit={this.createProduct}>
            <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
                <input type="text" 
                class="form-control"
                 id="exampleInputEmail1" 
                placeholder="Enter product name"
                value={this.state.productName}
                onChange={this.productInputHandler}/>
               
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter price in ether"
                value={this.state.price}
                onChange={this.priceInputHandler}/>
                <small id="emailHelp" class="form-text text-muted">Enter the price in ether</small>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            
            </div>
      );
    }
  }

  export default Main;