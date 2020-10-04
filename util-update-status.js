var lastStatus;

function runUpdateStatusUtility() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var utilSheet = ss.getActiveSheet();
  var inventorySheet = ss.getSheetByName("INVENTORY");
  var inventory = inventorySheet.getRange("A2:E").getValues();
  var rows = utilSheet.getRange("A2:B").getValues();
  
  rows.forEach(function (row) {
    var barcode = row[0], newStatus = row[1];
    if (!barcode) return;
    
    // use the last set status if there is one
    if (!newStatus) {
      newStatus = lastStatus;
      if (!newStatus) return;
    }
    lastStatus = newStatus;
    
    // try to find an occurrence of this barcode in inventory
    var i = rowIndexFromBarcode(inventory, barcode);
    if (i === false)
      return;
    
    // update status
    updateStatusAsofChangedby(inventorySheet, i, newStatus);
    
  });
}

function rowIndexFromBarcode(inventory, barcode) {
  for (var i = 0; i < inventory.length;i++){
    if (inventory[i][0] == barcode){
      return i;
    }
  }
  return false;
}

function updateStatusAsofChangedby(inventorySheet, i, newStatus) {
  
  // update that cell with the new status
  inventorySheet.getRange(i+2, 3).setValue(newStatus);
  
  // update as of
  inventorySheet.getRange(i+2, 4).setValue(new Date());
  
  // update changed by
  inventorySheet.getRange(i+2, 5).setValue(Session.getActiveUser().getEmail().replace("@nv.ccsd.net", ""));  
}