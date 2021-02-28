const { getScannableItemByName } = require('./itemEntryService');
const {
    addItemToOrder,
    orderInformation,
    removeItemFromOrder
} = require('./itemScanningService');


jest.mock('./itemEntryService');


describe('addItemToOrder', () => {

    beforeEach(() => {
        getScannableItemByName.mockReset();
        orderInformation.items = [];
        orderInformation.orderTotal = 0;
        scannableItems = [ {
            itemName: 'soup', 
            unitType: 'unit', 
            price: 1.27
        },
        {
            itemName: 'bananas', 
            unitType: 'pounds', 
            price: 0.98 
        }];
      });

    test('when a valid item is passed to addItemToOrder, it is added to the list of scanned items', () => {
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'soup', 
                unitType: 'unit', 
                price: 1.27
            });
        addItemToOrder('soup');
        expect(orderInformation.items).toEqual([{itemName: 'soup', price: 1.27, units:1}]);
    });

    test('if an item that is not scannable is passed to addItemToOrder, an error is thrown', () => {
        getScannableItemByName.mockReturnValue(undefined);
        expect(() => { addItemToOrder('orange juice') }
            ).toThrow(Error(`orange juice is not a valid item in this POS system.`));
    });

    test('when a valid item that is priced per unit is passed to addItemToOrder, the price of that item is added to the total', () => {
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'soup', 
                unitType: 'unit', 
                price: 1.27
            });
        addItemToOrder('soup');
        expect(orderInformation.orderTotal).toEqual(1.27);
    });

    test('when a valid item that is priced by weight is passed to addItemToOrder, the price of that item is added to the total', () => {
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'bananas', 
                unitType: 'pounds', 
                price: 0.98 
            });
        addItemToOrder('bananas', 4);
        expect(orderInformation.orderTotal).toEqual(3.92);
    });

});

describe('removeItemFromOrder', () => {

    beforeEach(() => {
        getScannableItemByName.mockReset();
        
        scannableItems = [ {
            itemName: 'soup', 
            unitType: 'unit', 
            price: 1.27
        },
        {
            itemName: 'bananas', 
            unitType: 'pounds', 
            price: 0.98 
        }];
      });

    test('when a valid item is passed to removeItemFromOrder, it is removed from the list of items on the order', () => {
        orderInformation.items =[{itemName: 'soup', price: 1.27, units:1},{itemName: 'bananas', price: .98, units:3}];
        orderInformation.orderTotal = 2.25;
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'soup', 
                unitType: 'unit', 
                price: 1.27
            });
        removeItemFromOrder('soup');
        expect(orderInformation.items).not.toContain({itemName: 'soup', price: 1.27, units:1});
    });
    test('when a valid item is passed to removeItemFromOrder, the order total is reduced by the cost of that item', () => {
        orderInformation.items =[{itemName: 'soup', price: 1.27, units:1},{itemName: 'bananas', price: .98, units:3}];
        orderInformation.orderTotal = 2.25;
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'soup', 
                unitType: 'unit', 
                price: 1.27
            });
        removeItemFromOrder('soup');
        expect(orderInformation.orderTotal).toEqual(.98);
    });

    test('when a valid item that is priced by weight is passed to removeItemFromOrder, the order total is reduced by the cost of that item', () => {
        orderInformation.items =[{itemName: 'soup', price: 1.27, units:1},{itemName: 'bananas', price: .98, units:3}];
        orderInformation.orderTotal = 2.25;
        getScannableItemByName.mockReturnValue(
            {
                itemName: 'bananas', 
                unitType: 'pounds', 
                price: .98
            });
        removeItemFromOrder('bananas', 2);
        expect(orderInformation.orderTotal).toEqual(0.29000000000000004);
    });
});