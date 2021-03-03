import ScannableItem from "./scannableItem";

let instance = null;
/** Class representing a point of sale system. */
export default class PointOfSale {
    /**
     * Create a point of sale system.
     */
    constructor(){
        if(instance){
            return instance;
        }
        this.scannableItems = [];
        this.specials = [];
        instance = this;
    };

    /**
     * Add a scannable item to the POS system.
     * @return {ScannableItem} The scannable item to add
     */
    addScannableItem(scannableItem) {
        this.scannableItems.push(scannableItem);
    };

    /**
     * Add a special to the POS system.
     * @return {Object} The special to add
     */
    addSpecial(special) {
        this.specials.push(special);
    };

     /**
     * Retrieve a scannable item from the POS system.
     * @param {String} itemName - the name of the item to retrieve from the POS system
     * @return {ScannableItem} The scannable item with the name {itemName}
     */
    retrieveScannableItemByName(itemName) {
        return this.scannableItems.find(item => item.itemName === itemName.toLowerCase());
    };

      /**
     * Returns the existing instance of PointOfSale, or creates a new one if instance === null
     */
    static getInstance() {
        return instance || new PointOfSale();
    };
}
