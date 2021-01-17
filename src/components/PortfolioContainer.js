import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ownedStocks, onSell}) {

  const ownedStocksArray = ownedStocks.map(stock => 
    <Stock key={stock.id} stock={stock} onStockClick={onSell}/>
  )
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        ownedStocksArray
        //render your portfolio stocks here
      }
    </div>
  );
}

export default PortfolioContainer;
