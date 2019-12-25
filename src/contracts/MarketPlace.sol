pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    struct Product{
        uint id;
        string name;
        uint price;
        address payable  owner;
        bool purchased;
    }
    mapping(uint => Product) public products;
    uint public productCount=0;
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
     event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
    constructor() public {
        name = "Dapp University Marketplace";
    }
    function  createProduct(string memory _name,uint _price) public {
       require(bytes(_name).length>0);
       require( _price>0);
       productCount++;
       products[productCount] = Product(productCount,_name,_price,msg.sender,false);
       //emit ProductCreated(productCount,_name,_price,msg.sender,false);
    }
    
    function purchaseProduct(uint _id) payable public {
        Product memory  _product =products[_id];
        address payable _seller=_product.owner;
        //id should be valid
        require(_id>0 && _id<=productCount);
        //payment should be valid
        require(msg.value>=_product.price);
        //buyer should not be _seller
        require(msg.sender!=_product.owner);
        //product should not be purchased
        require(!_product.purchased);
        
        _product.owner=msg.sender;
        _product.purchased=true;
        products[_id]=_product;
        address(_seller).transfer(msg.value);
        //triggering the event
       // emit ProductPurchased(_id,_product.name,_product.price,msg.sender,true);
        
        
        
        
    
    }
    

    }