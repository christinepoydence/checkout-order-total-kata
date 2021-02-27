const { getScannableItemByName } = require('./itemEntryService');
const {
    scannedItems,
    addItemToOrder,
    orderInformation
} = require('./itemScanningService');


jest.mock('./itemEntryService');


describe('addItemToOrder', () => {

    beforeEach(() => {
        orderInformation.items = [];
        orderInformation.orderTotal = 0;
        scannableItems = [{itemName: 'soup', unitType: 'unit', price: 1.27}];
        getScannableItemByName.mockReturnValue({itemName: 'soup', unitType: 'unit', price: 1.27});
      });

    test('when a valid item is passed to addItemToOrder, it is added to the list of scanned items', () => {
        addItemToOrder('soup');
        expect(scannedItems).toContain('soup');
    });

    test('if an item that is not scannable is passed to addItemToOrder, an error is thrown', () => {
        getScannableItemByName.mockReturnValue(undefined);
        expect(() => { addItemToOrder('orange juice') }
            ).toThrow(Error(`orange juice is not a valid item in this POS system.`));
    });

    test('when a valid item with a unit type of unit is passed to addItemToOrder, the price of that item is added to the total', () => {
        addItemToOrder('soup');
        expect(orderInformation.orderTotal).toEqual(1.27);
    });

});