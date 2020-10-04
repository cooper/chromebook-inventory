function guessSerials() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var changeLogSheet = ss.getSheetByName("Change Log");
  var inventorySheet = ss.getSheetByName("INVENTORY");
  var inventory = inventorySheet.getRange("A2:C").getValues();
  var rows = changeLogSheet.getRange("A2:K").getValues();
  
  
  rows.forEach(function (row, thisRow) {
   
    // empty row or already have serial
    var barcode = row[1], serial = row[2];
    if (!barcode || serial) return;
    
    // try to find an occurrence of this barcode in inventory
    var i = rowIndexFromBarcode(inventory, barcode);
    if (i === false)
      return;
    
    // determine the serial from that
    serial = inventory[i][1];
    
    // update change log to reflect
    changeLogSheet.getRange(thisRow+2, 3).setValue(serial);
  });
}
