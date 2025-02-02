import { useState } from 'react'
import { TaxBands } from './Constants'
import { OldTaxCalculation, NewTaxCalculation } from './Calculators'
import './App.css'

function App() {

  const [earnedAmount, setEarnedAmount] = useState(0)
  const [dividendAmount, setDividendAmout] = useState(0)

  const [calculatedOldTax, setCalculatedOldTax] = useState([])
  const [calculatedNewTax, setCalculatedNewTax] = useState([])

  const [taxCalculated, setTaxCalculated] = useState(false)


  
  function calculateTax(e)
  {
    e.preventDefault()
    console.log("Calculating Tax - Old")
    
    setTaxCalculated(true)

    const earnedOld = OldTaxCalculation(earnedAmount, false);
    const dividendOld = OldTaxCalculation(dividendAmount, true);

    const combinedNew = NewTaxCalculation(earnedAmount, dividendAmount);

    console.log({ earnedOld, dividendOld, combinedNew });
  }

  return (
    <>
      <div>
        <form onSubmit={calculateTax}>
          <div>
            <label htmlFor="earned-amount">Amount Earned (ex Dividends)</label>
            <input type="number" name="earned-amount" onChange={(e) => setEarnedAmount(e.target.value)} />
          </div>
          <div>
            <label htmlFor="dividends-amount">Amount via Dividends</label>
            <input type="number" name="dividends-amount" onChange={(e) => setDividendAmout(e.target.value)}/>
          </div>
          <button type="submit">Calculate</button>
        </form>
      </div>
      {taxCalculated &&
      <div>
        Section Two - Tables and Graphs?
      </div>
      }
    </>
  )
}

export default App
