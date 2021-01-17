import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onBuy }) {

  const stockList = stocks.map(stock => 
    <Stock key={stock.id} stock={stock} onStockClick={onBuy}/>  
  )
  return (
    <div>
      <h2>Stocks</h2>
      {/* render stock list here*/}
      {stockList}
    </div>
  );
}

export default StockContainer;
