const {
    scannableItems,
} = require('./itemEntryService');

const scannedItems = [];

const addItemToOrder = (itemName) => {
    scannedItems.push(itemName);
}

module.exports = {
    scannedItems,
    addItemToOrder
}