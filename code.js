// fetch the spreadsheet
let ss = SpreadsheetApp.getActiveSpreadsheet()

// configuration
let schoolName = ss.getName()

// session info
let email = Session.getActiveUser().getEmail()
let user = {
  email:    email,
  username: email.substring(0, email.indexOf('@'))
}

// pages that are allowed
const pages = ['overview', 'not-found', 'status', 'update-status']
let page = 'overview'

const pages = {
  'overview':       handleOverview,
  'not-found':      null,
  'status':         null,
  'update-status':  null
}

// handle GET request
function doGet(request) {
  page = request.parameter.page

  // find the page
  if (!page)
    page = 'overview' // otherwise show overview
  if (!pages.hasOwnProperty(page))
    page = 'not-found'
  
  // apply template parameters
  let tmpl = HtmlService.createTemplateFromFile(page)
  applyTmplParmas(tmpl)

  // call handler if there is one
  let handler = pages[page]
  if (handler)
    handler(request, tmpl)
  
  return tmpl.evaluate().setTitle(page + ' | ' + schoolName)
}

// include template
function include(filename, params) {
  return applyTmplParmas(HtmlService.createTemplateFromFile(filename)).evaluate().getContent()
}

// standard parameters for all templates
function applyTmplParmas(tmpl) {
  tmpl.ssUrl = ss.getUrl()
  tmpl.schoolName = schoolName
  tmpl.page = page
  tmpl.url = ScriptApp.getService().getUrl()
  tmpl.user = user
  return tmpl
}