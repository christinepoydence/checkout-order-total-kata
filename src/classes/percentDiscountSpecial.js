export default class PercentDiscountSpecial {
    constructor(special){
        this.specialName = special.name,
        this.limit = special.limit;
        this.quantityNeededToTriggerSpecial = special.quantityNeededToTriggerSpecial;
        this.quantityDiscounted = special.quantityDiscounted;
        this.percentageDiscount = special.percentageDiscount;
    };

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

    maximumDiscountedItems(){
        if(this.limit){
            return Math.floor(this.limit/(this.quantityNeededToTriggerSpecial + this.quantityDiscounted));
        }else{
            return 10000; //Arbitrarily large number that exceeds the number of items on any grocery list. (No limit for purposes of this application.)
        }
    };

}