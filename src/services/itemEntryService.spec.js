
const {
    addScannableItemToSystem, scannableItems
} = require('./itemEntryService');

describe('addScannableItemToSystem', () => {

    test('when an item is passed to addScannableItemToSystem, it is added to the list of scannable items', () => {
        const item = {item: "soup"}
        addScannableItemToSystem(item);
        expect(scannableItems).toMatchObject(item);
    });
});