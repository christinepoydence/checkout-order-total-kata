import Order from '../classes/order.js';
import {
    scanItem,
    removeItemFromOrder
} from './itemScanningService.js';
import {
    addScannableItemToSystem,
    modifyScannableItemInSystem
} from './itemEntryService.js';
import { addMarkDownToItem, removeMarkDownFromItem } from "./itemMarkdownService";
import OrderedItem from '../classes/orderedItem.js';
import PointOfSale from '../classes/pointOfSale.js';

const baseItem = {
    itemName: 'fruit loops',
    unitType: 'unit', 
    price: 1.69
};
const priceReduction = 0.40;
const expectedFinalPrice = baseItem.price - priceReduction;

describe('scanItem', () => {

    beforeEach(() => {
        Order.getInstance().items = [];
        Order.getInstance().orderTotal = 0;
        PointOfSale.getInstance().scannableItems = [];
        addScannableItemToSystem(baseItem);
      });

    test('when a valid item is scanned, it is added to the list of scanned items', () => {
        scanItem(baseItem.itemName);
        expect(Order.getInstance().items).toContainEqual({"itemName": baseItem.itemName, "price": baseItem.price, "units": 1});
    });

    test('when a valid, marked-down item is scanned, it is added to the list of scanned items', () => {
        addMarkDownToItem(baseItem.itemName, priceReduction);
        scanItem(baseItem.itemName);
        expect(Order.getInstance().items).toContainEqual({itemName: baseItem.itemName, price: expectedFinalPrice, units: 1});
    });

    test('when a valid, marked-down item is scanned, the order total is correctly incremented', () => {
        addMarkDownToItem(baseItem.itemName, priceReduction);
        scanItem(baseItem.itemName);
        expect(Order.getInstance().orderTotal).toEqual(expectedFinalPrice);
    });

    test('when a valid item is scanned and it is already on the order, the units of the item on the order are incremented', () => {
        scanItem(baseItem.itemName);
        expect(Order.getInstance().items).toContainEqual({itemName: 'fruit loops', price: 1.69, units:1});
        scanItem(baseItem.itemName, 3);
        expect(Order.getInstance().items).toContainEqual({itemName: 'fruit loops', price: 1.69, units:4});
    });

    test('when a valid item is passed to scanItem and it is already on the order, an error should be thrown if the price has changed', () => {
        scanItem( baseItem.itemName);
        const updatedItem = {...baseItem, price: 1.79};
        modifyScannableItemInSystem(updatedItem);
        expect(() => { scanItem(baseItem.itemName); }
        ).toThrow(Error(`The price of the item has changed since the beginning of your order. Please remove all fruit loops from your order and rescan them.`));
    });

    test('if an item that is not scannable is passed to scanItem, an error is thrown', () => {
        expect(() => {scanItem('wheat thins');}
        ).toThrow(Error(`wheat thins is not a valid item in this POS system.`));
    });

    test('when a valid item that is priced per unit is passed to scanItem, the price of that item is added to the total', () => {
        scanItem(baseItem.itemName);
        expect(Order.getInstance().orderTotal).toEqual(baseItem.price);
    });

    test('when a valid item that is priced by weight is passed to scanItem, the price of that item is added to the total', () => {
        const weightedItem = {itemName: 'wheat bread', unitType: 'pounds', price: 2.04};
        addScannableItemToSystem(weightedItem);
        scanItem(weightedItem.itemName);
        expect(Order.getInstance().orderTotal).toEqual(2.04);
    });

});

describe('removeItemFromOrder', () => {

    beforeEach(() => {
        Order.getInstance().items = [];
        Order.getInstance().orderTotal = 0;
        PointOfSale.getInstance().scannableItems = [];
        addScannableItemToSystem(baseItem);
        scanItem(baseItem.itemName)
      });

    test('when a valid item is removed, it is removed from the list of items on the order', () => {
        removeItemFromOrder(baseItem.itemName);
        expect(Order.getInstance().items).not.toContainEqual(new OrderedItem(baseItem));
    });

    test('when a valid item is removed, the quantity is reduced by the quantity of items that were removed', () => {
        const baseItem = {itemName: 'turkey', unitType: 'pounds', price: 4.90};
        addScannableItemToSystem(baseItem);
        scanItem('turkey',5);
        removeItemFromOrder('turkey', 2);
        expect(Order.getInstance().items).toContainEqual({itemName: 'turkey', price: 4.90, units: 3});
    });

    test('when a valid item is removed, the order total is reduced by the cost of that item', () => {
        expect(Order.getInstance().orderTotal).toEqual(1.69);
        removeItemFromOrder('fruit loops');
        expect(Order.getInstance().orderTotal).toEqual(0);
    });

    test('when a valid item that is priced by weight is removed, the order total is reduced by the cost of that item', () => {
        Order.getInstance().orderTotal = 3.00;
        const baseItem = {itemName: 'lollipop', unitType: 'pounds', price: 0.10};
        addScannableItemToSystem(baseItem);
        scanItem('lollipop',5);
        removeItemFromOrder('lollipop', 5);
        expect(Order.getInstance().orderTotal).toEqual(3.00);
    });

    test('if a clerk tries to remove more items than were scanned, an error is thrown', () => {
        const baseItem = {itemName: 'tootsie rolls', unitType: 'unit', price: 0.10};
        addScannableItemToSystem(baseItem);
        scanItem('tootsie rolls',3);
        expect(() => { removeItemFromOrder('tootsie rolls', 4); }
        ).toThrow(Error( "You have only ordered 3 of this item. You cannot delete 4 units."));
    });

    test('if an item not on the order is passed to removeItemFromOrder, an error is thrown', () => {
        const baseItem = {itemName: 'sprite', unitType: 'unit', price: 0.10};
        addScannableItemToSystem(baseItem);
        expect(() => {removeItemFromOrder('sprite'); }
        ).toThrow(Error(`sprite is not on the order.`));
    });

    test('if an item that is not scannable is passed to removeItemFromOrder, an error is thrown', () => {
        expect(() => {removeItemFromOrder('M&Ms'); }
        ).toThrow(Error('M&Ms is not a valid item in this POS system.'));
    });
});