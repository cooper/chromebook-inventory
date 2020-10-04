// create pie chart
function handleOverview(request, tmpl) {

    //////////////////////////
    /// OVERVIEW PIE CHART ///
    //////////////////////////

    // fetch the values
    let range = ss.getSheets()[SHEET_OVERVIEW].getRange(RANGE_OVERVIEW_CHART)
    let values = range.getDisplayValues()

    // force numeric context of counts
    for (let i = 0; i < values.length; i++)
        values[i][1] = parseInt(values[i][1])

    // inject header row
    values.unshift(['Type', 'Count'])

    tmpl.overviewChartJSON = JSON.stringify(values)


    // count available and checkout
    let circulation = {},
        available   = {},
        checkedOut  = {}
    let inventory   = ss.getSheets()[SHEET_INVENTORY].getRange(RANGE_INVENTORY).getDisplayValues()

    inventory.forEach((row) => {

        // only looking for status circulation or circulation cosmetic
        if (!['CIRCULATION', 'CIRCULATION (COSMETIC)'].includes(row[COL_INVENTORY_STATUS]))
            return

        let makeModel = row[COL_INVENTORY_MAKE] + ' ' + row[COL_INVENTORY_MODEL]

        // increment for entire circulation
        circulation[makeModel] = ++circulation[makeModel] || 1

        // see if checked out and increment proper counter
        if (row[COL_INVENTORY_CHECKOUT])
            checkedOut[makeModel] = ++checkedOut[makeModel] || 1
        else
            available[makeModel] = ++available[makeModel] || 1
    })

    ///////////////////////
    /// MODEL BAR CHART ///
    ///////////////////////

    let chartHeaderRow       = ['Status'],
        chartCirculationRow  = ['Circulation'],
        chartCheckedOutRow   = ['Checked Out'],
        chartAvailableRow    = ['Available']

    Object.keys(circulation).forEach((makeModel) => {
        let model = makeModel.split(/\s/)[1]
        let circ  = circulation[makeModel] || 0,
            out   = checkedOut[makeModel]  || 0,
            avail = available[makeModel]   || 0

        chartHeaderRow.push(makeModel, { role: 'annotation' })
        chartCirculationRow.push(circ, circ.toLocaleString()  + ' ' + model)
        chartCheckedOutRow.push(out, out.toLocaleString()  + ' ' + model)
        chartAvailableRow.push(avail, avail.toLocaleString()  + ' ' + model)

    })

    tmpl.modelChartJSON = JSON.stringify([
        chartHeaderRow, chartCirculationRow, chartCheckedOutRow, chartAvailableRow ])
}