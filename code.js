// pages that are allowed
const pages = ['index', 'status', 'update-status']
let page = 'index'

function doGet(request) {
  page = request.parameter.page

  // find the page
  if (!page || !pages.includes(page))
    page = 'index' // otherwise show index
  
  // template parameters
  let tmpl = HtmlService.createTemplateFromFile(page)
  
  return applyTmplParmas(tmpl).evaluate().setTitle(page + ' | Silvestri Chromebooks')
}

// include template
function include(filename, params) {
  return applyTmplParmas(HtmlService.createTemplateFromFile(filename)).evaluate().getContent()
}

// standard parameters for all templates
function applyTmplParmas(tmpl) {
  tmpl.page = page
  tmpl.url = ScriptApp.getService().getUrl()
  tmpl.email = Session.getActiveUser().getEmail()
  return tmpl
}