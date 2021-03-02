import PointOfSale from './pointOfSale.js';

test('Point of Sale can be constructed', () => {
    const pos = new PointOfSale();
    expect(pos.scannableItems.length).toBe(0);
});

test('instance of point of sale is used if Point of Sale is constructed twice', () => {
    const pos = new PointOfSale();    
    const pos2 = new PointOfSale();
    expect(pos).toEqual(pos2);
});

test('addScannableItem adds an item to pos.scannableItems', () => {
    const pos = new PointOfSale();
    pos.addScannableItem({itemName: 'item'});
    expect(pos.scannableItems).toContainEqual({itemName: 'item'});
});

test('retrieveScannableItemByName returns an item with the name that is passed from scannable items', () => {
    const pos = new PointOfSale();
    const retrievedItem = pos.retrieveScannableItemByName('item');
    expect(retrievedItem).toEqual({itemName: 'item'});
});

