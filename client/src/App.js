import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import xrplogo from './xrplogo.png'
class App extends Component {
  constructor(props){
    super(props);
    this.state = { xrp: {}, quote:'' };
  }
 componentWillMount() {
   this.getXrp();
   this.getQuotes();

 }
  getXrp() {
    axios.get('https://chimcugay.com/api/pricelist')
        .then(response => {
          let xrp = response.data.filter(xrp => xrp.coin_code === 'XRP');
          xrp = xrp[0];
          this.setState({ xrp })
          console.log(this.state.xrp);
        })
  }
  getQuotes() {
    axios.get('http://quotes.rest/qod.json')
      .then(response => {
        let quote = response.data;
        quote = quote.contents.quotes[0].quote;
        this.setState({quote: quote});
        console.log(quote);
      })
      .catch(err => err)
  }
  render() {
    const xrp = this.state.xrp;
    return (
      <div className='information'>
        <div className="card">
          <div className="card-block">
            <h4 className="card-title text-center display-2"><img src={xrplogo} /></h4>
            <h6 className="card-subtitle display-4 text-center mb-2 text-muted">{xrp.coin_name}</h6>
            <p className="card-text text-center">{this.state.quote}</p>
            <a href="#" className="card-link btn btn-primary">BUY: {Math.floor(xrp.buy_price * 22745,3)} VND</a>
            <a href="#" className="card-link btn btn-danger float-right">SELL: {Math.floor(xrp.sell_price,3)} VND</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
