// create pie chart
function handleOverview(request, tmpl) {

    // fetch the values
    let range = ss.getSheets()[0].getRange('C5:D14')
    let values = range.getDisplayValues()

    // force numeric context of counts
    for (let i = 0; i < values.length; i++)
        values[i][1] = parseInt(values[i][1])

    // inject header row
    values.unshift(['Type', 'Count'])

    tmpl.chartJSON = JSON.stringify(values)
}