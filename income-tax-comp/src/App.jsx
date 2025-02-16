import { useState } from 'react'
import { InitialDetails } from './Constants'
import { OldTaxCalculation, OldCapitalGainsCalculation, NewTaxCalculation } from './Calculators'
import Results from './Components/Results'
import InputCardItem from './Components/InputCardItem'
import './App.css'

function App() {

  // Variables for proposed system
  const [personalAllowance, setPersonalAllowance] = useState(InitialDetails.personalAllowance)
  const [increaseSteps, setIncreaseSteps] = useState(InitialDetails.increaseSteps)
  const [amountIncreasePerStep, setAmountIncreasePerStep] = useState(InitialDetails.amountIncreasePerStep)
  const [startPercent, setStartPercent] = useState(InitialDetails.startPercent)
  const [percentIncreasePerStep, setPercentIncreasePerStep] = useState(InitialDetails.percentIncreasePerStep)

  // Amounts user has earned.
  const [earnedAmount, setEarnedAmount] = useState(25000)
  const [dividendAmount, setDividendAmout] = useState(0)
  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0)

  const [calculatedOldEarnedTax, setCalculatedOldEarnedTax] = useState([])
  const [totalOldEarnedTax, setTotalOldEarnedTax] = useState(0)
  const [calculatedOldDividendTax, setCalculatedOldDividendTax] = useState([])
  const [totalOldDividendTax, setTotalOldDividendTax] = useState(0)
  const [calculatedOldCapitalGainsTax, setCalculatedOldCapitalGainsTax] = useState([])
  const [totalOldCapitalGainsTax, setTotalOldCapitalGainsTax] = useState(0)
  const [calculatedNewTax, setCalculatedNewTax] = useState([])
  const [totalNewTax, setTotalNewTax] = useState(0)

  const [taxCalculated, setTaxCalculated] = useState(false)


  
  function calculateTax(e)
  {
    e.preventDefault()
    
    setTaxCalculated(true)
    const oldEarnedTax = OldTaxCalculation(earnedAmount, false)
    const oldDividendTax = OldTaxCalculation(dividendAmount, true)
    const oldCapitalGainsTax = OldCapitalGainsCalculation(capitalGainsAmount)
    const newTax = NewTaxCalculation(personalAllowance,earnedAmount + dividendAmount + capitalGainsAmount, increaseSteps, amountIncreasePerStep, startPercent, percentIncreasePerStep)
    setCalculatedOldEarnedTax(oldEarnedTax);
    setTotalOldEarnedTax(oldEarnedTax.reduce((n, {taxPaid}) => n + taxPaid, 0))
    setCalculatedOldDividendTax(oldDividendTax);
    setTotalOldDividendTax(oldDividendTax.reduce((n, {taxPaid}) => n + taxPaid, 0))
    setCalculatedOldCapitalGainsTax(oldCapitalGainsTax)
    setTotalOldCapitalGainsTax(oldCapitalGainsTax.reduce((n, {taxPaid}) => n + taxPaid, 0))
    setCalculatedNewTax(newTax);
    setTotalNewTax(newTax.reduce((n, {taxPaid}) => n + taxPaid, 0))
  }

  function resetDetails()
  {
    setTaxCalculated(false)
  }

  function resetNewTax(){
    setPersonalAllowance(InitialDetails.personalAllowance)
    setIncreaseSteps(InitialDetails.increaseSteps)
    setAmountIncreasePerStep(InitialDetails.amountIncreasePerStep)
    setStartPercent(InitialDetails.startPercent)
    setPercentIncreasePerStep(InitialDetails.percentIncreasePerStep)
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
        <form onSubmit={(e) => {e.preventDefault()}} onReset={resetNewTax} className="card-full">
          <InputCardItem
            onChange={v => setPersonalAllowance(v)}
            title="The personal allowance amount"
            forLabel="pa-amount"
            display="Personal Allowance"
            prefix="£"
            defaultValue={InitialDetails.personalAllowance} />
          <InputCardItem
            onChange={v => setAmountIncreasePerStep(v)}
            title="The amount to increase the band range by on each step"
            forLabel="ips-amount"
            display="Band Amount"
            prefix="£" 
            defaultValue={InitialDetails.amountIncreasePerStep} />
          <InputCardItem
            onChange={v => setStartPercent(v / 100)}
            title="The initial percentage to start at."
            forLabel="init-perc-amount"
            display="Initial Percent"
            prefix="%"
            defaultValue={InitialDetails.startPercent * 100} />
          <InputCardItem
            onChange={v => setIncreaseSteps(v)}
            title="The amount of steps to increase the percentage."
            forLabel="steps-amount"
            display="Steps"
            prefix="" 
            defaultValue={InitialDetails.increaseSteps} />
          <InputCardItem
            onChange={v => setPercentIncreasePerStep(v / 100)}
            title="The percentage to increase by per step."
            forLabel="inc-perc-amount"
            display="Percentage Increase"
            prefix="%"
            defaultValue={InitialDetails.percentIncreasePerStep * 100} />
        </form>
      </div>
      <div className="results-row">
        <form onSubmit={calculateTax} onReset={resetDetails} className="card-full">
          <InputCardItem 
            onChange={v => setEarnedAmount(v)} 
            title="This is your salary earned on a yearly basis."
            forLabel="earned-amount" 
            display="Salary"
            prefix="£"
            defaultValue="25000" />
          <InputCardItem 
            onChange={v => setDividendAmout(v)} 
            title="This is what you received in dividends on a yearly basis." 
            forLabel="dividends-amount" 
            display="Dividends"
            prefix="£"
            defaultValue="0" />
          <InputCardItem
            onChange={v => setCapitalGainsAmount(v)}
            title="This is what you receieved in capital gains on a yearly basis."
            forLabel="cg-amount"
            display="Captial Gains"
            prefix="£"
            defaultValue="0" />
          <button type="submit">Calculate</button>
          <button type="reset" className="btn-clear">Reset</button>
        </form>
      </div>
      {taxCalculated &&<>
        <div className="results-row">
          <Results entries={calculatedOldEarnedTax} tableHeader={"Old Earned Tax**"} />
          <Results entries={calculatedOldDividendTax} tableHeader={"Old Dividend Tax"} />
          <Results entries={calculatedOldCapitalGainsTax} tableHeader={"Old Capital Gains Tax*"} />
        </div>
        <div className="results-row">
          <Results entries={calculatedNewTax} tableHeader={"New Tax System"} />
        </div>
        <div className="results-row">
          <div className="card-full">
            <p>Under the old systems you'd pay <strong>£{(totalOldEarnedTax + totalOldDividendTax + totalOldCapitalGainsTax).toFixed(2)}</strong> and on the new system you'd pay <strong>£{totalNewTax.toFixed(2)}</strong>.</p>
          </div>
        </div>
        <div className="results-row">
          <p>* NOTE: The captial gains calculation doesn't factor in the difference in sources where some can have a different rate.</p>
        </div>
        <div className="results-row">
          <p>** NOTE: This doesn't take into account the Personal Allowance reductions at £100K+.</p>
        </div>
        </>
      }
    </>
  )
}

export default App
