// this file contains sheets and ranges

// SHEETS
const   SHEET_OVERVIEW              = 0,
        SHEET_CHANGELOG             = 1,
        SHEET_LOOKUP_TABLES         = 2,
        SHEET_INVENTORY             = 3

// OVERVIEW
const   RANGE_OVERVIEW_CHART        = 'C5:D13' // exclude Out of Date

// INVENTORY
const   COL_INVENTORY_BARCODE           = 0,
        COL_INVENTORY_SERIAL            = 1,
        COL_INVENTORY_STATUS            = 2,
        COL_INVENTORY_AS_OF             = 3,
        COL_INVENTORY_CHANGED_BY        = 4,
        COL_INVENTORY_MAKE              = 5,
        COL_INVENTORY_MODEL             = 6,
        COL_INVENTORY_FUND              = 7,
        COL_INVENTORY_CHECKOUT          = 8,
        COL_INVENTORY_PATRON_ID         = 9,
        COL_INVENTORY_LAST_SYNC         = 10,
        COL_INVENTORY_LAST_ACTIVITY     = 11,
        COL_INVENTORY_LAST_DURATION     = 12,
        COL_INVENTORY_LAST_USER         = 13,
        COL_INVENTORY_PROVISION_STATUS  = 14,
        COL_INVENTORY_OS_VERSION        = 15,
        COL_INVENTORY_FIRMWARE          = 16,
        COL_INVENTORY_EXPIRATION        = 17,
        COL_INVENTORY_INTERNAL_IP       = 18,
        COL_INVENTORY_EXTERNAL_IP       = 19,
        COL_INVENTORY_ACQUIRED          = 20,
        COL_INVENTORY_COST              = 21,
        RANGE_INVENTORY                 = 'A2:V'