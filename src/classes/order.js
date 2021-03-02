let instance = null;

export default class Order {
    constructor(){
        if(instance){
            return instance;
        }
        this.items = [];
        this.orderTotal = 0;
        instance = this;
    };

    addOrderedItem(orderedItem) {
        this.items.push(orderedItem);
    };

    removeOrderedItem(itemName) {
        this.items = this.items.filter(item => item.itemName !== itemName);
    };

    retrieveOrderedItemByName(itemName) {
        return this.items.find(item => item.itemName === itemName.toLowerCase());
    };

    incrementOrderTotal(pricePerUnit, units) {
        this.orderTotal += +(pricePerUnit*units).toFixed(2);
    };

    decrementOrderTotal(pricePerUnit, units) {
        this.orderTotal -= +(pricePerUnit*units).toFixed(2);
    };

    static getInstance() {
        return instance || new Order();
    };
}
