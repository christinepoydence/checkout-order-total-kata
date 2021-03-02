import get from 'lodash.get';

export default class ScannableItem {
    constructor(item){
        this.itemName = get(item, 'itemName').toLowerCase();
        this.unitType = get(item, 'unitType');
        this.price = +get(item,'price').toFixed(2);
        this.isMarkedDown = false;
        this.priceReduction = 0;
    };

    markDownItem(priceReduction) {
        this.isMarkedDown = true;
        this.priceReduction = +priceReduction.toFixed(2);
    };

    removeMarkDown() {
        this.isMarkedDown = false;
        this.priceReduction = 0;
    };

    calculatePrice() {
        return +(this.price - this.priceReduction).toFixed(2);
    };

}

