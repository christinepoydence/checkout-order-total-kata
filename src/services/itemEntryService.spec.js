import PointOfSale from '../classes/pointOfSale.js';
import ScannableItem from '../classes/scannableItem.js';
import {
    addScannableItemToSystem, 
    modifyScannableItemInSystem
} from './itemEntryService.js';

const baseItem = {
    itemName: 'soup', 
    unitType: 'unit', 
    price: 1.69
};

const secondItem = {
    itemName: 'chili', 
    unitType: 'unit', 
    price: 2.69
};

describe('addScannableItemToSystem', () => {

    beforeEach(() => {
        PointOfSale.getInstance().scannableItems = [];
        PointOfSale.getInstance().specials = [];
      });

    test('when a valid, new item is passed, it is added to the list of scannable items', () => {
        addScannableItemToSystem(baseItem);
        expect(PointOfSale.getInstance().scannableItems[0]).toEqual(new ScannableItem(baseItem));
    });

    test('when multiple valid, new items are passed, they are added to the list of scannable items', () => {
        addScannableItemToSystem(baseItem);
        addScannableItemToSystem(secondItem);
        expect(PointOfSale.getInstance().scannableItems[0]).toEqual(new ScannableItem(baseItem));
        expect(PointOfSale.getInstance().scannableItems[1]).toEqual(new ScannableItem(secondItem));
    });

    test('when a new item is passed, it must contain a price', () => {
        const item = {itemName: "alphabet soup", unitType: 'unit'};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid price'));
    });

    test('when a new item is passed, it must contain an item name', () => {
        const item = {price: 1.89, unitType: 'pounds'};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid itemName'));
    });

    test('when a new item is passed, it must contain a valid unit type', () => {
        const item = {itemName: 'bananas', price: 2.38};
        expect(() => { addScannableItemToSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid unitType'));
    });

    test('duplicate items cannot be added to the list of scannable items', () => {
        addScannableItemToSystem(baseItem);
        expect(() => { addScannableItemToSystem(baseItem); }
        ).toThrow(Error(`soup already exists in the POS system. Please modify the item instead of re-adding it.`));
    });
});

describe('modifyScannableItemInSystem', () => {
    
    beforeEach(() => {
        PointOfSale.getInstance().scannableItems = [];
        PointOfSale.getInstance().specials = [];
      });

    test('when a valid, existing item is passed, the item is updated with a new price and unit type', () => {
        addScannableItemToSystem(baseItem);
        expect(PointOfSale.getInstance().scannableItems).toContainEqual(new ScannableItem(baseItem));

        const modifiedItem = {...baseItem, price: 3.42};
        modifyScannableItemInSystem(modifiedItem);
        expect(PointOfSale.getInstance().scannableItems).toContainEqual(new ScannableItem(modifiedItem));
        expect(PointOfSale.getInstance().scannableItems).not.toContainEqual(new ScannableItem(baseItem));
    });
    
    test('when a new item is passed, an error should be thrown', () => {
        expect(() => { modifyScannableItemInSystem(baseItem); }
        ).toThrow(Error(`${baseItem.itemName} is not in the POS system. Please add a new item instead of modifying.`));
    });

    test('when an item is passed, it must contain a price', () => {
        addScannableItemToSystem(baseItem);
        const modifiedItem = {itemName: "soup", unitType: 'unit'};
        expect(() => { modifyScannableItemInSystem(modifiedItem); }
        ).toThrow(Error('Scannable items must contain a valid price'));
    });

    test('when an item is passed, it must contain an item name', () => {
        const item = {price: 1.89, unitType: 'pounds'};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid itemName'));
    });

    test('when an item is passed, it must contain a valid unit type', () => {
        addScannableItemToSystem(baseItem);
        const item = {itemName: 'soup', price: 2.38};
        expect(() => { modifyScannableItemInSystem(item); }
        ).toThrow(Error('Scannable items must contain a valid unitType'));
    });

});