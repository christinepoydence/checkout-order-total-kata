import Order from './order.js';

test('Order can be constructed', () => {
    const order = new Order();
    expect(order.items.length).toBe(0);
    expect(order.orderTotal).toBe(0);
});

test('instance of order is used if Order is constructed twice', () => {
    const order = new Order();
    const secondOrder = new Order();
    expect(order).toEqual(secondOrder);
});