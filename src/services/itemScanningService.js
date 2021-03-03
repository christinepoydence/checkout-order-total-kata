import OrderedItem from '../classes/orderedItem.js';
import PointOfSale from '../classes/pointOfSale.js';
import Order from '../classes/order.js';

const retrieveItemInformation = (itemName) => {
    const itemInformation = PointOfSale.getInstance().retrieveScannableItemByName(itemName);
    if(!itemInformation){
        throw new Error(`${itemName} is not a valid item in this POS system.`);
    }
    return itemInformation;
};

const modifyItemOnOrder = (itemInformation, itemOnOrder, units) => {
    const currentPrice = itemOnOrder.price;
    const newPrice = itemInformation.calculatePrice(itemOnOrder.units + units);
    Order.getInstance().decrementOrderTotal(currentPrice);
    Order.getInstance().incrementOrderTotal(newPrice);
    itemOnOrder.units += units;
    itemOnOrder.price = newPrice;
};

const addItemToOrder = (itemInformation, units) => {
    const orderedItem = new OrderedItem({
        itemName: itemInformation.itemName,
        units,
        price: itemInformation.calculatePrice(units)
    });
    Order.getInstance().addOrderedItem(orderedItem);
    Order.getInstance().incrementOrderTotal(orderedItem.price);
};

export const scanItem = (itemName, units=1) => {
    const itemInformation = retrieveItemInformation(itemName);
    const itemOnOrder =  Order.getInstance().retrieveOrderedItemByName(itemName);
    if(itemOnOrder){
        modifyItemOnOrder(itemInformation, itemOnOrder, units);
    }else{
        addItemToOrder(itemInformation, units);
    }
};

export const removeItemFromOrder = (itemName, units=1) => {
    const itemInformation = retrieveItemInformation( itemName);
    const itemOnOrder =  Order.getInstance().retrieveOrderedItemByName(itemName);
    if(itemOnOrder){
        if(itemOnOrder.units < units){
            throw new Error(`You have only ordered ${itemOnOrder.units} of this item. You cannot delete ${units} units.`);
        }else if(itemOnOrder.units > units){
            itemOnOrder.price = itemInformation.calculatePrice(itemOnOrder.units - units);
            itemOnOrder.units = itemOnOrder.units - units;
        }else{
            Order.getInstance().removeOrderedItem(itemName);
        }        
        const priceToDecrement = itemInformation.calculatePrice(units);
        Order.getInstance().decrementOrderTotal(priceToDecrement);
    }else{
        throw new Error(`${itemName} is not on the order.`);
    }
};

export const getOrderTotal = () => {
    return Order.getInstance().orderTotal;
};