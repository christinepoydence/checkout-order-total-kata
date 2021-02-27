const {
    scannableItems,
    getScannableItemByName
} = require('./itemEntryService');

const scannedItems = [];
const orderInformation = {
    items: scannedItems,
    orderTotal: 0
};

const addItemToOrder = (itemName) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    scannedItems.push(itemName);
    if(itemInformation.unitType === 'unit'){
        orderInformation.orderTotal += itemInformation.price;
    }
};

module.exports = {
    scannedItems,
    addItemToOrder,
    orderInformation
}