export function OldTaxCalculation(ae, isDividends){
    const bands = [];
    if(isDividends)
    {
        bands.push({
            display: "Dividend Allowance",
            percent: 0,
            from: 0,
            to: 500,
        });
        bands.push({
            display: "Basic Rate",
            percent: 0.0875,
            from: 500,
            to: 50270
        });
        bands.push({
            display: "Higher Rate",
            percent: 0.3375,
            from:50270,
            to: 125140,
        })
        bands.push({
            display: "Additional Rate",
            percent: 0.3935,
            from: 125140
        });
    }
    else
    {
        bands.push({
            display: "Personal Allowance",
            percent: 0,
            from: 0,
            to: 12570,
        });
        bands.push({
            display: "Basic Rate",
            percent: 0.20,
            from: 12570,
            to: 50270
        });
        bands.push({
            display: "Higher Rate",
            percent: 0.40,
            from:50270,
            to: 125140,
        })
        bands.push({
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
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}

export function NewTaxCalculation(ae, de){
    const bands = [];

    bands.push({
        display: "Personal Allowance",
        percent: 0,
        from: 0,
        to: 20000,
    });
    bands.push({
        display: "20%",
        percent: 0.2,
        from: 20000,
        to: 60000
    });
    bands.push({
        display: "25%",
        percent: 0.25,
        from:100000,
        to: 140000,
    })
    bands.push({
        display: "30%",
        percent: 0.3,
        from: 140000,
        to: 180000
    });
    bands.push({
        display: "35%",
        percent: 0.35,
        from: 180000,
        to: 220000
    });
    bands.push({
        display: "40%",
        percent: 0.4,
        from:220000,
    })

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
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}