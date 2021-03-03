import get from 'lodash.get';

/** Class representing a scannable item */
export default class ScannableItem {

    /**
     * Create a ScannableItem
     * @param {Object} item - An object containing the item's name, unit type, and price
     */
    constructor(item){
        this.itemName = get(item, 'itemName').toLowerCase();
        this.unitType = get(item, 'unitType');
        this.price = +get(item,'price').toFixed(2);
        this.isMarkedDown = false;
        this.priceReduction = 0;
        this.isOnSpecial = false;
        this.special = null;
    };

    /**
     * add a special deal to the ScannableItem
     * @param {Object} special - The special to be added to the scannable item
     */
    addSpecialToItem(special) {
        this.isOnSpecial = true;
        this.special = special;
    }

    /**
     * remove a special deal from the ScannableItem
     * @param {Object} special - The special to be removed from the scannable item
     */
    removeSpecialFromItem(special) {
        this.isOnSpecial = false;
        this.special = null;
    }

    /**
     * add a markdown to the ScannableItem
     * @param {Number} priceReduction - The amount that the markdown reduces the unit price
     */
    markDownItem(priceReduction) {
        this.isMarkedDown = true;
        this.priceReduction = +priceReduction.toFixed(2);
    };

    /**
     * remove a markdown from the ScannableItem
     */
    removeMarkDown() {
        this.isMarkedDown = false;
        this.priceReduction = 0;
    };

    /**
     * calculate the price, inclusive of the full price and the markdown price
     */
    calculatePrice() {
        return +(this.price - this.priceReduction).toFixed(2);
    };

}

