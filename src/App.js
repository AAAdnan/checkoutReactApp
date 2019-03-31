import React, { Component } from 'react';
import Nav from './Nav';
import ItemPage from './ItemPage';
import ItemList from './ItemList';
import {items} from './static-data';
import CartPage from './CartPage';
import './App.css';

class App extends Component {
  state = {
    activeTab: 0,
    cart: [],
    items: []
  };

  nextItemId = 0;

  makeItem() {
    return {
      id: this.nextItemId++,
      value: Math.random()
    };
  }

  addItemImmutably = () => {
    this.setState({
      items: [
        ...this.state.items,
        this.makeItem()
      ]
    });
  }

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    });
  }

  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  }

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    });
  }

  
  renderContent() {
    switch(this.state.activeTab) {
      default:
      case 0: return <ItemPage 
                        items={items}
                        onAddToCart={this.handleAddToCart} />;
      case 1: return this.renderCart();
    }
  }

  renderCart() {

    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});

    let cartItems = Object.keys(itemCounts).map(itemId => {
      var item = items.find(item => 
        item.id === parseInt(itemId, 10)
      );

      return {
        ...item,
        count: itemCounts[itemId]
      }
    });

    return (
      <CartPage items={cartItems} 
                onAddOne={this.handleAddToCart}
                onRemoveOne={this.handleRemoveOne} />
    );

  }

  render() {
    let {activeTab} = this.state;
    return (
      <div className="App">
        <div>
          {this.state.items.length} items
        </div>
        <Nav activeTab={activeTab} onTabChange={this.handleTabChange} />
        <main className="App-content">
          {this.renderContent()}
        </main>
        <ItemList items={this.state.items}/>
      </div>
    );
  }
}

export default App;
