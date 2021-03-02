import get from 'lodash.get';

export default class OrderedItem {
    constructor(item){
        this.itemName = get(item, 'itemName').toLowerCase();
        this.units = get(item, 'units');
        this.price = +get(item,'price').toFixed(2);
    };
}