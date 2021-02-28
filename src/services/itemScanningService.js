const {
    scannableItems,
    getScannableItemByName
} = require('./itemEntryService');

const orderInformation = {
    items: [],
    orderTotal: 0
};

const addItemToOrder = (itemName, units=1) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    orderInformation.items.push(
        {
            itemName: itemName, 
            units: units, 
            price: itemInformation.price
        });
    orderInformation.orderTotal += itemInformation.price * units;
};

const removeItemFromOrder = (itemName, units=1) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    if(orderInformation.items.find(item => item.itemName === itemName)){
        const item = orderInformation.items.find(item => item.itemName === itemName);
        if(item.units < units){
            throw new Error(`You have only ordered ${item.units} of this item. You cannot delete ${units} units.`);
        }else if(item.units > units){
            item.units = item.units - units;
            orderInformation.orderTotal = orderInformation.orderTotal - units*itemInformation.price;
        }else{
            orderInformation.items = orderInformation.items.filter(item => item.itemName !== itemName);
            orderInformation.orderTotal = orderInformation.orderTotal - units*itemInformation.price;
        }        
    }
};

module.exports = {
    addItemToOrder,
    orderInformation,
    removeItemFromOrder
}