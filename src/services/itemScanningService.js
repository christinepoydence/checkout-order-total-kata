const {
    scannableItems,
    getScannableItemByName
} = require('./itemEntryService');

const orderInformation = {
    items: [],
    orderTotal: 0
};

const addItemToOrder = (itemName, unitsOfWeight) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    orderInformation.items.push(itemName);
    if(itemInformation.unitType === 'unit'){
        orderInformation.orderTotal += itemInformation.price;
    }else{
        orderInformation.orderTotal += itemInformation.price * unitsOfWeight;
    }
};

const removeItemFromOrder = (itemName) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    if(orderInformation.items.includes(itemName)){
        orderInformation.items = orderInformation.items.filter(item => item !== itemName);
    }
};

module.exports = {
    addItemToOrder,
    orderInformation,
    removeItemFromOrder
}