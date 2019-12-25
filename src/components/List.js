import React, { Component } from 'react';


class List extends Component {

    render() {
      return (
           <div  className="container" >
             <h1 style={{color :"green",marginTop:"50px"}}>Product list</h1>
           <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button   
                      class="btn btn-primary"
                      onClick={(event)=>{this.props.purchaseProduct(product.id,product.price)}}
                        >
                          Buy
                        </button>
                      :<h3>SOLD</h3>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
         </div>
      );
    }
  }

  export default List;