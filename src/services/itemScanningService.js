const {
    scannableItems,
    getScannableItemByName
} = require('./itemEntryService');

const scannedItems = [];

const addItemToOrder = (itemName) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    scannedItems.push(itemName);
}

module.exports = {
    scannedItems,
    addItemToOrder
}