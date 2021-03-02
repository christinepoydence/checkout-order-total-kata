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
    if(itemInformation.calculatePrice() !== itemOnOrder.price){
        throw new Error(`The price of the item has changed since the beginning of your order. Please remove all ${itemOnOrder.itemName} from your order and rescan them.`);
    }
    itemOnOrder.units += units;
};

const addItemToOrder = (itemInformation, units) => {
    const orderedItem = new OrderedItem({
        itemName: itemInformation.itemName,
        units,
        price: itemInformation.calculatePrice()
    });
    Order.getInstance().addOrderedItem(orderedItem);
    Order.getInstance().incrementOrderTotal(orderedItem.price, orderedItem.units);
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
            itemOnOrder.units = itemOnOrder.units - units;
        }else{
            Order.getInstance().removeOrderedItem(itemName);
        }        
        Order.getInstance().decrementOrderTotal(itemInformation.calculatePrice(), units);
    }else{
        throw new Error(`${itemName} is not on the order.`);
    }
};