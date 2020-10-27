let action

// handle GET request for JSON API
function doGetAction(request) {

  // this has to be here
  // because if defined at file level, the handler functions are not yet defined
  var actions = {
    'not-found':      handleAPINotFound,
    'lookup-status':  handleAPIStatusQuery
  }

  // find the action
  action = request.parameter.action
  if (!actions.hasOwnProperty(action))
    action = 'not-found'
  
  let result = { action: action }

  // call handler if there is one
  let handler = actions[action]
  if (handler)
    handler(request, result)
  
  // return javascript
  if (request.parameter.prefix) return ContentService.createTextOutput(
    request.parameters.prefix + '(' + JSON.stringify(result) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT)

  // return json
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON)
}

function handleAPINotFound(request, result) {
  result.error = 'No such API action'
}

function handleAPIStatusQuery(request, result) {
  let found

  // find the record by Serial Number, Barcode, or User Input (full or partial BC or SN)
  if (request.parameter.serial)
    found = inventoryFindBySerial(request.parameter.serial)
  else if (request.parameter.barcode)
    found = inventoryFindByBarcode(request.parameter.barcode)
  else if (request.parameter.input)
    found = inventoryFindByUserInput(request.parameter.input)
  else
    return result.error = "One of 'serial', 'barcode', or 'input' is needed for the lookup-status action"

  // didn't find it
  if (!found) {
    result.error = 'No such record'
    result.noSuchRecord = true
    return
  }

  result.device = found
}