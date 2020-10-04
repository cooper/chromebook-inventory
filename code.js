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
const pages = ['index', 'not-found', 'status', 'update-status']
let page = 'index'

// handle GET request
function doGet(request) {
  page = request.parameter.page

  // find the page
  if (!page)
    page = 'index' // otherwise show index
  if (!pages.includes(page))
    page = 'not-found'
  
  // template parameters
  let tmpl = HtmlService.createTemplateFromFile(page)
  
  return applyTmplParmas(tmpl).evaluate().setTitle(page + ' | ' + schoolName)
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