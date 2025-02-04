function Results({entries, tableHeader})
{
    const rows = entries.map((v) => (
        <tr key={v.key}>
            <td>{v.display}</td>
            <td>{v.percent * 100}%</td>
            <td>{v.taxPaid}</td>
        </tr>
    ))
    const totalTax = entries.reduce((n, {taxPaid}) => n + taxPaid, 0)

    if (rows.length == 0){
        rows.push(<tr key={"emptyRow"} colSpan="3">
            <td>No tax details...</td>
        </tr>)
    }

    return (
        <>
        <table className="card">
            <thead>
                <tr>
                    <th colSpan="3">{tableHeader}</th>
                </tr>
                <tr>
                    <th>Rate</th>
                    <th>Percentage</th>
                    <th>Tax Amount</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">Total Tax Paid</td>
                    <td>{totalTax}</td>
                </tr>
            </tfoot>
        </table>
        </>
    )
}

export default Results;