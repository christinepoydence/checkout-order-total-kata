/** Class representing a FlatRateSpecial. */
export default class FlatRateSpecial {
     /**
     * Create a flatRateSpecial.
     * @param {Object} special - object that contains the name of the special, the number of items in the special, and the flat rate
     */
    constructor(special){
        this.specialName = special.name;
        this.numberOfItems = special.numberOfItems;
        this.flatRate = special.flatRate;
    };

    /**
     * Calculate the amount of money that the special will save given a base price and the number of units to purchase
     * @param {Number} unitsOfItem - number of units of the item to purchase
     * @param {Number} basePrice - the base price per unit of the item on special
     * @returns {Number} - the dollar amount of the discount that the special offers for a given number of items and base price
     */
    calculateDiscount(unitsOfItem, basePrice){
        const itemsPurchasedAtFlatRate = this.numberOfItems*Math.floor(unitsOfItem/this.numberOfItems);
        const itemsPurchasedAtUnitPrice = unitsOfItem - itemsPurchasedAtFlatRate;
        const priceWithoutDiscount = +(unitsOfItem*basePrice).toFixed(2);
        const discountPrice = +((this.flatRate*(itemsPurchasedAtFlatRate/this.numberOfItems)) + itemsPurchasedAtUnitPrice*basePrice).toFixed(2);
        return +(priceWithoutDiscount - discountPrice).toFixed(2);
    };
}
