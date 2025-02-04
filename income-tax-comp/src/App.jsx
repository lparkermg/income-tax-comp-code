import { useState } from 'react'
import { TaxBands } from './Constants'
import { OldTaxCalculation, NewTaxCalculation } from './Calculators'
import Results from './Results'
import './App.css'

function App() {

  const [earnedAmount, setEarnedAmount] = useState(0)
  const [dividendAmount, setDividendAmout] = useState(0)

  const [calculatedOldEarnedTax, setCalculatedOldEarnedTax] = useState([])
  const [calculatedOldDividendTax, setCalculatedOldDividendTax] = useState([])
  const [calculatedNewTax, setCalculatedNewTax] = useState([])

  const [taxCalculated, setTaxCalculated] = useState(false)


  
  function calculateTax(e)
  {
    e.preventDefault()
    console.log("Calculating Tax - Old")
    
    setTaxCalculated(true)

    setCalculatedOldEarnedTax(OldTaxCalculation(earnedAmount, false));
    setCalculatedOldDividendTax(OldTaxCalculation(dividendAmount, true));

    setCalculatedNewTax(NewTaxCalculation(earnedAmount + dividendAmount));
  }

  function resetDetails()
  {
    setTaxCalculated(false)
  }

  return (
    <>
      <div className="results-row">
        <div className="card">
          <h2>Little UK Tax Thing</h2>
          <p>Thing is a little tax thing. It's designed to show how merging Income Tax and Dividend Tax into an singular income tax will mean less tax for workers.</p>
          <p>This kind of structure is designed to be fairer over all and simplifying this aspect of the tax system over all.</p>
          <p>Essentially, this tax would replace Income Tax and Dividend Tax, into something that starts at a 25% rate increasing at every +£20k earned up to 50% in 5% increments. This would include a Personal Allowance increase to £20k which is currently at £12,570.</p>
        </div>
      </div>
      <div className="results-row">
        <form onSubmit={calculateTax} onReset={resetDetails} className="card-full">
          <div className="card-item" title="This is your salary earned on a yearly basis.">
            <label htmlFor="earned-amount">Active Income</label>
            <input type="number" name="earned-amount" min="0" onChange={(e) => setEarnedAmount(Number(e.target.value))}/>
          </div>
          <div className="card-item" title="This is what you received in dividends on a yearly basis.">
            <label htmlFor="dividends-amount">Dividend Income</label>
            <input type="number" name="dividends-amount" min="0" onChange={(e) => setDividendAmout(Number(e.target.value))}/>
          </div>
          <button type="submit">Calculate</button>
          <button type="reset" className="btn-clear">Reset</button>
        </form>
      </div>
      {taxCalculated &&
        <div className="results-row">
          <Results entries={calculatedOldEarnedTax} tableHeader={"Old Earned Tax"} />
          <Results entries={calculatedOldDividendTax} tableHeader={"Old Dividend Tax"} />
          <Results entries={calculatedNewTax} tableHeader={"New Tax System"} />
        </div>
      }
    </>
  )
}

export default App
