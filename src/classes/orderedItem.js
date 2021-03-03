import get from 'lodash.get';

/** This is a class representing an ordered item */
export default class OrderedItem {
     /**
     * Create an ordered item.
     * @param {Object} item - An object containing the item's name, units ordered, and price
     */
    constructor(item){
        this.itemName = get(item, 'itemName', '').toLowerCase();
        this.units = get(item, 'units');
        this.price = +get(item,'price').toFixed(2);
    };
}