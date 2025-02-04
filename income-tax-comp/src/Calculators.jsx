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

export function NewTaxCalculation(ae){
    const bands = [];

    bands.push({
        key: "ntpa",
        display: "Personal Allowance",
        percent: 0,
        from: 0,
        to: 20000,
    });
    bands.push({
        key: "nt25",
        display: "25%",
        percent: 0.25,
        from: 20000,
        to: 40000
    });
    bands.push({
        key: "nt30",
        display: "30%",
        percent: 0.3,
        from:40000,
        to: 60000,
    })
    bands.push({
        key: "nt35",
        display: "35%",
        percent: 0.35,
        from: 60000,
        to: 80000
    });
    bands.push({
        key: "nt40",
        display: "40%",
        percent: 0.4,
        from: 80000,
        to: 100000
    });
    bands.push({
        key: "nt45",
        display: "45%",
        percent: 0.45,
        from:100000,
        to: 120000
    })
    bands.push({
        key: "nt50",
        display: "50%",
        percent: 0.5,
        from: 120000,
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
                key: v.key,
                display: v.display,
                percent: v.percent,
                taxPaid,
            })
        }
    })

    return amounts;
}