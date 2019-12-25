import React, { Component } from 'react';


class Navbar extends Component {

    render() {
      return (
          <nav className="navbar  text-white navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0 "
          
            target="_blank"
            rel="noopener noreferrer"
          >
          MarketPlace
            
          </a>
          <a>
            {this.props.account}
            </a>
        </nav>
      );
    }
  }

  export default Navbar;