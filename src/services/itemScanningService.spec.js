import {jest} from '@jest/globals';
import Order from '../classes/order.js';
import {
    scanItem,
    removeItemFromOrder
} from './itemScanningService.js';
import {
    addScannableItemToSystem,
    modifyScannableItemInSystem
} from './itemEntryService.js';

jest.mock('../classes/pointOfSale');

describe('scanItem', () => {

    test('when a valid item is scanned, it is added to the list of scanned items', () => {
        const baseItem = {itemName: 'pears', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem(baseItem.itemName);
        expect(Order.getInstance().items).toContainEqual({itemName: 'pears', price: 1.69, units:1});
    });

    test('when a valid item is scanned and it is already on the order, the units of the item on the order are incremented', () => {
        const baseItem = {itemName: 'crackers', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem(baseItem.itemName);
        scanItem(baseItem.itemName, 3);
        expect(Order.getInstance().items).toContainEqual({itemName: 'crackers', price: 1.69, units:4});
    });

    test('when a valid item is passed to scanItem and it is already on the order, an error should be thrown if the price has changed', () => {
        const baseItem = {itemName: 'soup', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem( baseItem.itemName);
        const updatedItem = {itemName: 'soup', unitType: 'unit', price: 1.79};
        modifyScannableItemInSystem( updatedItem);
        expect(() => { scanItem(baseItem.itemName); }
        ).toThrow(Error(`The price of the item has changed since the beginning of your order. Please remove all soup from your order and rescan them.`));
    });

    test('if an item that is not scannable is passed to scanItem, an error is thrown', () => {
        expect(() => {scanItem('wheat thins');}
        ).toThrow(Error(`wheat thins is not a valid item in this POS system.`));
    });

    test('when a valid item that is priced per unit is passed to scanItem, the price of that item is added to the total', () => {
        Order.getInstance().orderTotal = 0;
        const baseItem = {itemName: 'mango', unitType: 'pounds', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem( 'mango');
        expect(Order.getInstance().orderTotal).toEqual(1.69);
    });

    test('when a valid item that is priced by weight is passed to scanItem, the price of that item is added to the total', () => {
        Order.getInstance().orderTotal = 0;
        const baseItem = {itemName: 'wheat bread', unitType: 'pounds', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem(baseItem.itemName);
        expect(Order.getInstance().orderTotal).toEqual(1.69);
    });

});

describe('removeItemFromOrder', () => {

    test('when a valid item is passed to removeItemFromOrder, it is removed from the list of items on the order', () => {
        const baseItem = {itemName: 'barley', unitType: 'pounds', price: 1.69};
        addScannableItemToSystem(baseItem);
        scanItem('barley');
        expect(Order.getInstance().items).toContainEqual({itemName: 'barley', price: 1.69, units:1});
        removeItemFromOrder('barley');
        expect(Order.getInstance().items).not.toContainEqual({itemName: 'barley', price: 1.69, units:1});
    });

    test('when a valid item is passed to removeItemFromOrder, the quantity is reduced by the quantity of items that were removed', () => {
        const baseItem = {itemName: 'turkey', unitType: 'pounds', price: 4.90};
        addScannableItemToSystem(baseItem);
        scanItem('turkey',5);
        removeItemFromOrder('turkey', 2);
        expect(Order.getInstance().items).toContainEqual({itemName: 'turkey', price: 4.90, units: 3});
    });

    test('when a valid item is passed to removeItemFromOrder, the order total is reduced by the cost of that item', () => {
        Order.getInstance().orderTotal = 3.00;
        const baseItem = {itemName: 'fruit roll ups', unitType: 'unit', price: 0.50};
        addScannableItemToSystem(baseItem);
        scanItem('fruit roll ups');
        removeItemFromOrder('fruit roll ups');
        expect(Order.getInstance().orderTotal).toEqual(3.00);
    });

    test('when a valid item that is priced by weight is passed to removeItemFromOrder, the order total is reduced by the cost of that item', () => {
        Order.getInstance().orderTotal = 3.00;
        const baseItem = {itemName: 'lollipop', unitType: 'unit', price: 0.10};
        addScannableItemToSystem(baseItem);
        scanItem('lollipop',5);
        removeItemFromOrder('lollipop', 5);
        expect(Order.getInstance().orderTotal).toEqual(3.00);
    });

    test('if a clerk tries to remove more items than were scanned, an error is thrown', () => {
        Order.getInstance().orderTotal = 3.00;
        const baseItem = {itemName: 'tootsie rolls', unitType: 'unit', price: 0.10};
        addScannableItemToSystem(baseItem);
        scanItem('tootsie rolls',3);
        expect(() => { removeItemFromOrder('tootsie rolls', 4); }
            ).toThrow(Error( "You have only ordered 3 of this item. You cannot delete 4 units."));
    });

    test('if an item not on the order is passed to removeItemFromOrder, an error is thrown', () => {
        Order.getInstance().orderTotal = 3.00;
        const baseItem = {itemName: 'sprite', unitType: 'unit', price: 0.10};
        addScannableItemToSystem(baseItem);
        expect(() => {removeItemFromOrder('sprite') }
            ).toThrow(Error(`sprite is not on the order.`));
    });

    test('if an item that is not scannable is passed to removeItemFromOrder, an error is thrown', () => {
        Order.getInstance().orderTotal = 3.00;
        expect(() => {removeItemFromOrder('M&Ms') }
            ).toThrow(Error('M&Ms is not a valid item in this POS system.'));
    });
});