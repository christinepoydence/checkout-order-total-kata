import Order from './order.js';

test('Order can be constructed', () => {
    const order = new Order();
    expect(order.items.length).toBe(0);
    expect(order.orderTotal).toBe(0);
});

test('original instance of order is used if Order is constructed twice', () => {
    const order = new Order();
    const secondOrder = new Order();
    expect(order).toEqual(secondOrder);
});

test('addOrderedItem adds an item to order.items', () => {
    const order = new Order();
    order.addOrderedItem({itemName: 'item'});
    expect(order.items).toContainEqual({itemName: 'item'});
});

test('removeOrderedItem removes an item from order.items', () => {
    const order = new Order();
    order.removeOrderedItem({itemName: 'item1'});
    expect(order.items).not.toContain('item');
});

test('retrieveOrderedItemByName returns an item from order.items', () => {
    const order = new Order();
    order.addOrderedItem({itemName: 'item1'});
    order.addOrderedItem({itemName: 'item2'});
    order.addOrderedItem({itemName: 'item3'});
    const retrievedItem = order.retrieveOrderedItemByName('item2');
    expect(retrievedItem).toEqual({itemName: 'item2'});
});

test('incrementOrderTotal increases the order total', () => {
    const order = new Order();
    order.incrementOrderTotal(1.2,4);
    expect(order.orderTotal).toEqual(4.8);
});

test('decrementOrderTotal decreases the order total', () => {
    const order = new Order();
    order.decrementOrderTotal(1.2,4);
    expect(order.orderTotal).toEqual(0);
});


