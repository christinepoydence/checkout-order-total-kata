
const {
    addScannableItemToSystem, scannableItems
} = require('./itemEntryService');

describe('addScannableItemToSystem', () => {

    test('when a valid item is passed to addScannableItemToSystem, it is added to the list of scannable items', () => {
        const item = {itemName: "soup", unitType: 'unit', price: 1.69}
        addScannableItemToSystem(item);
        expect(scannableItems).toMatchObject(item);
    });

    test('when an item is passed to addScannableItemToSystem, it must contain a price', () => {
        const item = {itemName: "soup", unitType: 'unit'};
        expect(() => { addScannableItemToSystem(item) }
            ).toThrow(Error('Scannable items must contain a valid price'));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain an item name', () => {
        const item = {price: 1.89, unitType: 'pounds'}
        expect(() => { addScannableItemToSystem(item) }
            ).toThrow(Error('Scannable items must contain a valid itemName'));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain a valid unit type', () => {
        const item = {itemName: 'bananas', price: 2.38}
        expect(() => { addScannableItemToSystem(item) }
            ).toThrow(Error('Scannable items must contain a valid unitType'));
    });
});