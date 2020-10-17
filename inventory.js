let globalInventory

function getInventory() {
    if (!globalInventory)
        globalInventory = ss.getSheets()[SHEET_INVENTORY].getRange(RANGE_INVENTORY).getDisplayValues()
    return globalInventory
}

// find device by full serial number
function inventoryFindBySerial(sn) {

}

// find device by full barcode
function inventoryFindByBarcode(bc) {

}

// find device by user input which can be any of
// 1. a full serial
// 2. a full barcode
// 3. a partial barcode
function inventoryFindByUserInput(input) {

}