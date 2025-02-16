export function OldTaxCalculation(ae, isDividends){
    const bands = [];
    if(isDividends)
    {
        bands.push({
            key: "da",
            display: "Dividend Allowance",
            percent: 0,
            from: 0,
            to: 500,
        });
        bands.push({
            key: "dabr",
            display: "Basic Rate",
            percent: 0.0875,
            from: 500,
            to: 50270
        });
        bands.push({
            key: "dahr",
            display: "Higher Rate",
            percent: 0.3375,
            from:50270,
            to: 125140,
        })
        bands.push({
            key: "daar",
            display: "Additional Rate",
            percent: 0.3935,
            from: 125140
        });
    }
    else
    {
        bands.push({
            key: "eapa",
            display: "Personal Allowance",
            percent: 0,
            from: 0,
            to: 12570,
        });
        bands.push({
            key: "eabr",
            display: "Basic Rate",
            percent: 0.20,
            from: 12570,
            to: 50270
        });
        bands.push({
            key: "eahr",
            display: "Higher Rate",
            percent: 0.40,
            from:50270,
            to: 125140,
        })
        bands.push({
            key: "eaar",
            display: "Additional Rate",
            percent: 0.45,
            from: 125140
        });
    }
    const amounts = [];
    bands.forEach(v => {
        // the amount earned is greater than the from value.
        var taxPaid = 0
        if(ae > v.from)
        {
            var amount = 0
            if(v.to && v.to <= ae)
            {
                // taxing the full amount of the band.
                amount = v.to - v.from
            }
            else
            {
                amount = ae - v.from 
            }

            taxPaid = amount * v.percent;

            amounts.push({
                key: v.key,
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}

export function OldCapitalGainsCalculation(ae){
    const bands = [];

    bands.push({
        key: "cgpa",
        display: "Personal Allowance",
        percent: 0,
        from: 0,
        to: 3000,
    });
    bands.push({
        key: "cgbr",
        display: "Basic Rate",
        percent: 0.18,
        from: 3000,
        to: 50270
    });
    bands.push({
        key: "cghr",
        display: "Higher Rate",
        percent: 0.24,
        from:50270,
    });

    const amounts = [];
    bands.forEach(v => {
        // the amount earned is greater than the from value.
        var taxPaid = 0
        if(ae > v.from)
        {
            var amount = 0
            if(v.to && v.to <= ae)
            {
                // taxing the full amount of the band.
                amount = v.to - v.from
            }
            else
            {
                amount = ae - v.from 
            }

            taxPaid = amount * v.percent;

            amounts.push({
                key: v.key,
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}

// TODO: Change this up to allow more flexibility in changes and building up the bands.
// This will come at the cost of having specific display labels?
export function NewTaxCalculation(pa, ae, amountOfSteps, increasePerStep, percentStart, percentStepIncrease){
    const bands = [];
    
    bands.push({
        key: "ntpa",
        display: "Personal Allowance",
        percent: 0,
        from: 0,
        to: pa,
    });

    var currentStep = 0;
    var currentFromAmount = pa;
    var currentPercent = percentStart
    while(currentStep < amountOfSteps){
        var nextTo = null;
        if(amountOfSteps - 1 > currentStep){
            nextTo = currentFromAmount + increasePerStep
        }
        bands.push({
            key: "nt" + (currentPercent * 100).toFixed(2).toString(),
            display: `${Number.parseFloat((currentPercent * 100).toFixed(2))}%`,
            percent: currentPercent,
            from: currentFromAmount,
            to: nextTo,
        });

        currentPercent = currentPercent + percentStepIncrease;
        currentFromAmount = currentFromAmount + increasePerStep;
        currentStep = currentStep + 1
    }

    const amounts = [];
    bands.forEach(v => {
        // the amount earned is greater than the from value.
        var taxPaid = 0
        if(ae > v.from)
        {
            var amount = 0
            if(v.to && v.to <= ae)
            {
                // taxing the full amount of the band.
                amount = v.to - v.from
            }
            else
            {
                amount = ae - v.from
            }

            taxPaid = amount * v.percent;

            amounts.push({
                key: v.key,
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}