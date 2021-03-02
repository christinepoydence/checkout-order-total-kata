import OrderedItem from './orderedItem.js';

test('OrderedItem can be constructed', () => {
    const item = {
        itemName: 'kiwi',
        units: 4,
        price: 1.42
    };
    const orderedItem = new OrderedItem(item);
    expect(orderedItem.itemName).toBe('kiwi');
    expect(orderedItem.units).toBe(4);
    expect(orderedItem.price).toBe(1.42);
});