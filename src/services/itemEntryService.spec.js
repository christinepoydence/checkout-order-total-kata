
const {
    addScannableItemToSystem, scannableItems
} = require('./itemEntryService');

describe('addScannableItemToSystem', () => {

    test('when an item is passed to addScannableItemToSystem, it is added to the list of scannable items', () => {
        const item = {item: "soup", price: '$1.69'}
        addScannableItemToSystem(item);
        expect(scannableItems).toMatchObject(item);
    });

    test('when an item is passed to addScannableItemToSystem, it must contain a price', () => {
        const item = {item: "soup"}
        expect(() => { addScannableItemToSystem(item) }
            ).toThrow(Error('Scannable items must contain an item name and a price.'));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain an item name', () => {
        const item = {price: "$1.89"}
        expect(() => { addScannableItemToSystem(item) }
            ).toThrow(Error('Scannable items must contain an item name and a price.'));
    });
});