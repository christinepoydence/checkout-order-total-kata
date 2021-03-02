import ScannableItem from './scannableItem.js';

test('ScannableItem can be constructed', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    }
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.itemName).toBe('kiwi');
    expect(scannableItem.unitType).toBe('ounces');
    expect(scannableItem.price).toBe(1.42);
    expect(scannableItem.isMarkedDown).toBe(false);
    expect(scannableItem.priceReduction).toEqual(0);
});