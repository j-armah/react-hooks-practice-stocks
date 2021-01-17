import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [ownedStocks, setOwnedStocks] = useState([])
  const [filterBy, setFilterBy] = useState("All")
  const [sortBy, setSortBy] = useState("Alphabetically")
  let filteredStocks = [...stocks]

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(r => r.json())
      .then(data => {
        setStocks(data)
      })
  }, [])

  const handleOnBuy = (boughtStock) => {
    if (ownedStocks.includes(boughtStock)) {
      alert("Already owned busta")
    } else {
      setOwnedStocks([...ownedStocks, boughtStock])
    }

  }

  const handleOnSell = (soldStock) => {
    const updatedStocks = ownedStocks.filter(stock => stock.id !== soldStock.id)
    setOwnedStocks(updatedStocks)
  }

  //console.log(filterBy)
  if (filterBy !== "All") {
    filteredStocks = stocks.filter(stock => 
      stock.type === filterBy
    )
    .sort((stockA, stockB) => {
      if (sortBy === "Price") {
        return stockA.price - stockB.price
      } else {
        return stockA.ticker.localeCompare(stockB.ticker) 
      }
    })
  } else {
    filteredStocks.sort((stockA, stockB) => {
      if (sortBy === "Price") {
        return stockA.price - stockB.price
      } else {
        return stockA.ticker.localeCompare(stockB.ticker) 
      }
    })
  }


  return (
    <div>
      <SearchBar setFilter={setFilterBy} sort={sortBy} setSort={setSortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuy={handleOnBuy}/>
        </div>
        <div className="col-4">
          <PortfolioContainer ownedStocks={ownedStocks} onSell={handleOnSell}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
