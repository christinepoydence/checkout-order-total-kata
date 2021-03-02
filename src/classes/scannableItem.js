import get from 'lodash.get';

export default class ScannableItem {
    constructor(item){
        this.itemName = get(item, 'itemName').toLowerCase();
        this.unitType = get(item, 'unitType');
        this.price = +get(item,'price').toFixed(2);
    }
}

