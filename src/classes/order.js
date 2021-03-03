let instance = null;

/** Class representing an Order */
export default class Order {
    /**
     * Create an order.
     */
    constructor(){
        if(instance){
            return instance;
        }
        this.items = [];
        this.orderTotal = 0;
        instance = this;
    };

    /**
     * Add a grocery item to the list of items on Order
     * @param {OrderedItem} orderedItem - The orderedItem to be added to the order.
     */
    addOrderedItem(orderedItem) {
        this.items.push(orderedItem);
    };

    /**
     * Removes a grocery item from the list of items on Order
     * @param {String} itemName - The name of the item to be removed from the order.
     */
    removeOrderedItem(itemName) {
        this.items = this.items.filter(item => item.itemName !== itemName);
    };

    /**
     * Retrieves a grocery item from the list of items on Order by itemName
     * @param {String} itemItem - The name of the item to be removed from the order.
     * @returns {OrderedItem} - The OrderedItem with itemName
     */
    retrieveOrderedItemByName(itemName) {
        return this.items.find(item => item.itemName === itemName.toLowerCase());
    };

    /**
     * Increments the orderTotal by a given amount
     * @param {Number} price - The cost of the orderedItem
     */
    incrementOrderTotal(price) {
        this.orderTotal += +price.toFixed(2);
    };

    /**
     * Decrements the orderTotal by a given amount
     * @param {Number} price - The cost of the orderedItem
     */
    decrementOrderTotal(price) {
        this.orderTotal -= +price.toFixed(2);
    };

    /**
     * Returns the existing instance of Order, or creates a new one if instance === nul
     */
    static getInstance() {
        return instance || new Order();
    };
}
