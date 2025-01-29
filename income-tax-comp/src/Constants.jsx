// TODO: Might be worth changing this up? Or just putting it into the calculators...
export const TaxBands = {
    old: [
        {
            display: "Basic Rate (20%)",
            above: 0,
            below: 50000,
            percent: 0.2,
            percentDiv: 0.0875
        },
        {
            display: "Higher Rate (40%)",
            above: 50000,
            below: 125140,
            percent: 0.4,
            percentDiv: 0.3375,
        },
        {
            display: "Additional Rate (45%)",
            above: 125140,
            below: null,
            percent: 0.45,
            percentDiv: 0.3935,
        }

    ],
    new: {
        startsAt:20000,
        endsAt: 120000,
        startPercentage: 0.25,
        incrementsEvery:20000,
        incrementBy: 0.05,
    }
}