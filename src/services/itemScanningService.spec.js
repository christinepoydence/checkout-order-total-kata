const {
    scannedItems,
    addItemToOrder
} = require('./itemScanningService');


jest.mock('./itemEntryService');


describe('addItemToOrder', () => {

    beforeEach(() => {
        scannableItems = [{itemName: 'soup', unitType: 'unit', price: 1.27}];
      });

    test('when a valid item is passed to addItemToOrder, it is added to the list of scanned items', () => {
        addItemToOrder('soup');
        expect(scannedItems).toContain('soup');
    });

});