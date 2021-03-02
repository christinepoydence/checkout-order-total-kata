import {jest} from '@jest/globals';
import PointOfSale from '../classes/pointOfSale.js';
import ScannableItem from '../classes/scannableItem.js';
import {
    addScannableItemToSystem, 
    modifyScannableItemInSystem
} from './itemEntryService.js';

describe('addScannableItemToSystem', () => {

    test('when a valid item is passed to addScannableItemToSystem, it is added to the list of scannable items', () => {
        const baseItem = {itemName: 'soup', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        expect(PointOfSale.getInstance().scannableItems[0]).toEqual(baseItem);
    });

    test('when multiple valid items are passed to addScannableItemToSystem, they are both added to the list of scannable items', () => {
        const baseItem1 = {itemName: 'chicken noodle soup', unitType: 'unit', price: 1.69};
        const baseItem2 = {itemName: 'chili', unitType: 'unit', price: 2.69};
        addScannableItemToSystem(baseItem1);
        addScannableItemToSystem(baseItem2);
        expect(PointOfSale.getInstance().scannableItems[1]).toEqual(new ScannableItem(baseItem1));
        expect(PointOfSale.getInstance().scannableItems[2]).toEqual(new ScannableItem(baseItem2));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain a price', () => {
        const item = {itemName: "alphabet soup", unitType: 'unit'};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid price'));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain an item name', () => {
        const item = {price: 1.89, unitType: 'pounds'};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid itemName'));
    });

    test('when an item is passed to addScannableItemToSystem, it must contain a valid unit type', () => {
        const item = {itemName: 'bananas', price: 2.38};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid unitType'));
    });

    test('duplicate items cannot be added to the list of scannable items', () => {
        const baseItem = {itemName: 'beets', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        expect(() => { addScannableItemToSystem(baseItem); }
        ).toThrow(Error(`beets already exists in the POS system. Please modify the item instead of re-adding it.`));
    });
});

describe('modifyScannableItemInSystem', () => {

    test('when an existing item is passed to modifyScannableItemInSystem, the item is updated with a new price and unit type', () => {
        const initialItem = {itemName: "apple", unitType: 'unit', price: 2.04};
        addScannableItemToSystem(initialItem);
        const modifiedItem = {itemName: "apple", unitType: 'gallons', price: 2.07};
        modifyScannableItemInSystem(modifiedItem);
        expect(PointOfSale.getInstance().scannableItems).toContainEqual(modifiedItem);
        expect(PointOfSale.getInstance().scannableItems).not.toContainEqual(initialItem);
    });
    
    test('when a new item is passed to modifyScannableItemInSystem, an error should be thrown', () => {
        const item = {itemName: "cereal", unitType: 'pounds', price: 2.04};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error(`${item.itemName} is not in the POS system. Please add a new item instead of modifying.`));
    });

    test('when an item is passed to modifyScannableItemInSystem, it must contain a price', () => {
        const baseItem = {itemName: 'cashews', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        const item = {itemName: "cashews", unitType: 'unit'};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid price'));
    });

    test('when an item is passed to modifyScannableItemInSystem, it must contain an item name', () => {
        const item = {price: 1.89, unitType: 'pounds'};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid itemName'));
    });

    test('when an item is passed to modifyScannableItemInSystem, it must contain a valid unit type', () => {
        const baseItem = {itemName: 'bananas', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        const item = {itemName: 'bananas', price: 2.38};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid unitType'));
    });

});