/** Class representing a percent discount special. */
export default class PercentDiscountSpecial {

    /**
     * Create a percent discount special
     * @param {Object} special - an object containing the special name, limit, quantities, and percentage discount
     */
    constructor(special){
        this.specialName = special.name,
        this.limit = special.limit;
        this.quantityNeededToTriggerSpecial = special.quantityNeededToTriggerSpecial;
        this.quantityDiscounted = special.quantityDiscounted;
        this.percentageDiscount = special.percentageDiscount;
    };

    /**
     * Calculate the amount of money that the special will save given a base price and the number of units to purchase
     * @param {Number} unitsOfItem - number of units of the item to purchase
     * @param {Number} basePrice - the base price per unit of the item on special
     * @returns {Number} - the dollar amount of the discount that the special offers for a given number of items and base price
     */
    calculateDiscount(unitsOfItem, basePrice){
        //add the number of items that you have to buy to the number of items that will be discounted
        //divide that by the units of item that you have purchased in order to determing how many items you will receive at the discounted price
        let quantityOfItemsQualifiedForSpecial = Math.floor(unitsOfItem/(this.quantityNeededToTriggerSpecial + this.quantityDiscounted));

        //Check if the number of discounted items is less than the limit, if so, use it, otherwise use the limit
        const totalNumberOfDiscountedItems = quantityOfItemsQualifiedForSpecial > this.maximumDiscountedItems() ? this.maximumDiscountedItems() : quantityOfItemsQualifiedForSpecial;

        //multiply the base price of the item by the percentage discount to get the per unit discount
        const discountedUnitPrice = +(this.percentageDiscount*basePrice).toFixed(2);

        //multiply the discount per unit by the total discounted item count to return the total discount that the special provided.
        return +(discountedUnitPrice*totalNumberOfDiscountedItems).toFixed(2);
    };

    /**
     * Calculate the maximum number of discounted items that you can receive based on the special's limit
     * @returns {Number} - the maximum number of discounted items that you can receive with this special
     */
    maximumDiscountedItems(){
        if(this.limit){
            return Math.floor(this.limit/(this.quantityNeededToTriggerSpecial + this.quantityDiscounted));
        }else{
            return 10000; //Arbitrarily large number that exceeds the number of items on any grocery list. (No limit for purposes of this application.)
        }
    };

}