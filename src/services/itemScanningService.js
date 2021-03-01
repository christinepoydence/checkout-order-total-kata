const {
    scannableItems,
    getScannableItemByName
} = require('./itemEntryService');

const orderInformation = {
    items: [],
    orderTotal: 0
};

const retrieveItemInformation = (itemName) => {
    const itemInformation = getScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    return itemInformation;
};

const retrieveItemFromOrder = (itemName) => {
    return orderInformation.items.find(item => item.itemName === itemName)
};

const modifyItemOnOrder = (itemInformation, itemOnOrder, units) => {
    itemOnOrder.units += units;
    if(itemInformation.price !== itemOnOrder.price){
        throw new Error(`The price of the item has changed since the beginning of your order. Please remove all ${itemOnOrder.itemName} from your order and rescan them.`)
    }
};

const addItemToOrder = (itemName, units=1) => {
    const itemInformation = retrieveItemInformation(itemName);
    const itemOnOrder = retrieveItemFromOrder(itemName);
    if(itemOnOrder){
        modifyItemOnOrder(itemInformation, itemOnOrder, units);
    }else{
        orderInformation.items.push(
            {
                itemName: itemName, 
                units: units, 
                price: itemInformation.price
            });
    }
    orderInformation.orderTotal += itemInformation.price * units;
};

const removeItemFromOrder = (itemName, units=1) => {
    const itemInformation = retrieveItemInformation(itemName);
    const itemOnOrder = retrieveItemFromOrder(itemName);
    if(itemOnOrder){
        if(itemOnOrder.units < units){
            throw new Error(`You have only ordered ${itemOnOrder.units} of this item. You cannot delete ${units} units.`);
        }else if(itemOnOrder.units > units){
            itemOnOrder.units = itemOnOrder.units - units;
        }else{
            orderInformation.items = orderInformation.items.filter(item => item.itemName !== itemName);
        }        
        orderInformation.orderTotal = orderInformation.orderTotal - units*itemInformation.price;
    }else{
        throw new Error(`${itemName} is not on the order.`);
    }
};

module.exports = {
    addItemToOrder,
    orderInformation,
    removeItemFromOrder
}