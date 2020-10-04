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

    //////////////////////////
    // AVAILABLE PIE CHART ///
    //////////////////////////

    ss.getSheets()[SHEET_INVENTORY]

    /////////////////////////
    // CHECKOUT PIE CHART ///
    /////////////////////////

}