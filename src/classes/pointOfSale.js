let instance = null;

export default class PointOfSale {
    constructor(){
        if(instance){
            return instance;
        }
        this.scannableItems = [];
        this.specials = [];
        instance = this;
    };

    addScannableItem(scannableItem) {
        this.scannableItems.push(scannableItem);
    };

    addSpecial(special) {
        this.specials.push(special);
    };

    retrieveScannableItemByName(itemName) {
        return this.scannableItems.find(item => item.itemName === itemName.toLowerCase());
    };

    static getInstance() {
        return instance || new PointOfSale();
    };
}
