var lastFund;

function runUpdateFundUtility() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var utilSheet = ss.getActiveSheet();
  var inventorySheet = ss.getSheetByName("INVENTORY");
  var inventory = inventorySheet.getRange("A2:H").getValues();
  var rows = utilSheet.getRange("A2:B").getValues();
  
  rows.forEach(function (row) {
    var serial = row[0], newFund = row[1];
    if (!serial) return;
    
    // use the last set fund if there is one
    if (!newFund) {
      newFund = lastFund;
      if (!newFund) return;
    }
    lastFund = newFund;
    
    // try to find an occurrence of this serial in inventory
    var i = rowIndexFromSerial(inventory, serial);
    if (i === false)
      return;
    
    // update fund
    updateFund(inventorySheet, i, newFund);
    
  });
}

function rowIndexFromSerial(inventory, serial) {
  for (var i = 0; i < inventory.length;i++){
    if (inventory[i][1] == serial){
      return i;
    }
  }
  return false;
}

function updateFund(inventorySheet, i, newFund) {
  
  // update that cell with the new fund
  inventorySheet.getRange(i+2, 8).setValue(newFund);
  
}