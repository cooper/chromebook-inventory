let action

// handle GET request for JSON API
function doGetAction(request) {

  // this has to be here
  // because if defined at file level, the handler functions are not yet defined
  var actions = {
    'not-found': handleAPINotFound
  }

  // find the action
  action = request.parameter.action
  if (!actions.hasOwnProperty(action))
    action = 'not-found'
  
  let result = {}

  // call handler if there is one
  let handler = actions[action]
  if (handler)
    handler(request, result)
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON)
}

function handleAPINotFound(request, result) {
  result.error = 'No such API action'
}