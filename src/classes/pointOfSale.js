let instance = null;

export default class PointOfSale {
    constructor(){
        if(instance){
            return instance;
        }
        this.scannableItems = [];
        instance = this;
    }

    addScannableItem(scannableItem) {
        this.scannableItems.push(scannableItem);
    };

    retrieveScannableItemByName(itemName) {
        return this.scannableItems.find(item => item.itemName === itemName.toLowerCase());
    }

    static getInstance() {
        return instance || new PointOfSale();
    }
}
