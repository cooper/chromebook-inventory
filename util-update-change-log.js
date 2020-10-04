function runUpdateChangeLogUtility() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var changeLogSheet = ss.getSheetByName("Change Log");
  var inventorySheet = ss.getSheetByName("INVENTORY");
  var inventory = inventorySheet.getRange("A2:E").getValues();
  var rows = changeLogSheet.getRange("A2:K").getValues();
  
  rows.forEach(function (row, thisRow) {
   
    // already checked or empty row
    var alreadyDone = row[7], barcode = row[1], newStatus = row[4];
    if (!barcode || alreadyDone) return;
    
    if (!newStatus)
      return;
    
    // try to find an occurrence of this barcode in inventory
    var i = rowIndexFromBarcode(inventory, barcode);
    if (i === false)
      return;
    
    // update status
    updateStatusAsofChangedby(inventorySheet, i, newStatus);
    
    // also check the box that we did this
    changeLogSheet.getRange(thisRow+2, 8).setValue(true);
    
  });
}
