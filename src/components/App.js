import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import MarketPlace from '../abis/Marketplace.json'
import Narbar from './Navbar'
import Main from './Main'
import List from './List'

class App extends Component {

  async loadWeb3(){
    
    if (window.ethereum) {
      console.log('ethereum')
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      console.log('web3')
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }


  }

  async componentWillMount(){
   await this.loadWeb3();
   console.log(window.web3)
   await this.loadBlockchainData();

  }
  async loadBlockchainData(){
     const web3=window.web3
     //load account
     const accounts=await web3.eth.getAccounts()
     console.log(accounts)
     this.setState({account:accounts[0]});
     const netId=await web3.eth.net.getId();
     console.log(netId);
     const networkData=MarketPlace.networks[netId];
     if(networkData){
     const marketplace=await web3.eth.Contract(MarketPlace.abi,networkData.address)
     console.log(marketplace);
     this.setState({marketplace})
     this.setState({loading:false})
     }else{
       alert('Marketplace contract is not deployed to network')
     }
    

     const productCount=await this.state.marketplace.methods.productCount().call();
     //alert(productCount);
     this.setState({productCount:productCount}) 
     for(var i=1;i<productCount;i++){
       var product=await this.state.marketplace.methods.products(i).call();
       console.log(product)
       this.setState({
        products: [...this.state.products, product]
      })
     }
     console.log(this.state.products)
     }

  constructor(props){
    super(props);
    this.state={
      account:"",
      productCount:0,
      products:[],
      loading:true


    }
  }

  createProduct=async (name,price)=>{
    console.log(name,price)
   // this.setState({ loading: true })
    await this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account });
    
    console.log('----------')
    window.location.reload(false);
  
  }

  purchaseProduct=async (id,price)=>{
   // alert('pourchase product ')
    // this.setState({ loading: true })
    const result=await this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account,value:price })
    console.log('-------------')
     window.location.reload(false);
 

      // this.setState({ loading: false })
     
     
   }
  render() {
    return (
      <div>
       <Narbar account={this.state.account}/>
       <div className="container-fluid  mt-5">
         <div className="row">
           <main role="mail" className="col-lg-12 d-flex">
             {this.state.loading ? 
             <div id="loader" className="text-center">Loading.........</div> : <Main createProduct={this.createProduct}/>}
           
             </main>
            
      
       </div>
       <div className="row">
       <main role="mail" className="col-lg-12 d-flex">
       
       <List products={this.state.products} purchaseProduct={this.purchaseProduct}></List>  
       </main>
         </div>
        
       
     </div>
       
        </div>
      
    );
  }
}

export default App;
