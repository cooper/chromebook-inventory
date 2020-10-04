// create pie chart
function handleOverview(request, tmpl) {

    /////////////////////////
    // OVERVIEW PIE CHART ///
    /////////////////////////

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
    let available  = {},
        checkedOut = {};
    let inventory = ss.getSheets()[SHEET_INVENTORY].getRange(RANGE_INVENTORY).getDisplayValues()

    inventory.forEach((row) => {

        // only looking for status circulation or circulation cosmetic
        if (!['CIRCULATION', 'CIRCULATION (COSMETIC)'].includes(row[COL_INVENTORY_STATUS]))
            return

        let makeModel = row[COL_INVENTORY_MAKE] + ' ' + row[COL_INVENTORY_MODEL]

        // see if checked out and increment proper counter
        if (row[COL_INVENTORY_CHECKOUT])
            checkedOut[makeModel] = ++checkedOut[makeModel] || 1

        else
            available[makeModel] = ++available[makeModel] || 1
    })

    //////////////////////////
    // AVAILABLE PIE CHART ///
    //////////////////////////

    values = Object.entries(available)

    // inject header row
    values.unshift(['Model', 'Count'])

    tmpl.availableChartJSON = JSON.stringify(values)

    /////////////////////////
    // CHECKOUT PIE CHART ///
    /////////////////////////

    values = Object.entries(checkedOut)

    // inject header row
    values.unshift(['Model', 'Count'])

    tmpl.checkoutChartJSON = JSON.stringify(values)
}