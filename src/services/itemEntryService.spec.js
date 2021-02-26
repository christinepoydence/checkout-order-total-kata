
const {
    addScannableItemToSystem, 
    scannableItems,
    modifyScannableItemInSystem
} = require('./itemEntryService');

describe('addScannableItemToSystem', () => {

    test('when a valid item is passed to addScannableItemToSystem, it is added to the list of scannable items', () => {
        const item = {itemName: "soup", unitType: 'unit', price: 1.69}
        addScannableItemToSystem(item);
        expect(scannableItems).toContain(item);
    });

    test('when multiple valid items are passed to addScannableItemToSystem, they are both added to the list of scannable items', () => {
        const item1 = {itemName: "chicken noodle soup", unitType: 'unit', price: 1.69}
        const item2 = {itemName: "ice cream", unitType: 'gallons', price: 1.68}
        addScannableItemToSystem(item1);
        addScannableItemToSystem(item2);
        expect(scannableItems).toContain(item1);
        expect(scannableItems).toContain(item2);
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

    test('duplicate items cannot be added to the list of scannable items', () => {
        const item = {itemName: "cream of mushroom soup", unitType: 'unit', price: 1.69}
        addScannableItemToSystem(item);
        expect(scannableItems).toContain(item);
        expect(() => { addScannableItemToSystem(item) }
        ).toThrow(Error(`${item.itemName} already exists in the scannable items list. Please modify the item instead of re-adding it.`));
    });
});

describe('modifyScannableItemInSystem', () => {

    test('when an existing item is passed to modifyScannableItemInSystem, the item is updated with a new price and unit type', () => {
        const initialItem = {itemName: "apple", unitType: 'pounds', price: 2.04};
        addScannableItemToSystem(initialItem);
        expect(scannableItems).toContain(initialItem);
        const modifiedItem = {itemName: "apple", unitType: 'gallons', price: 2.07};
        modifyScannableItemInSystem(modifiedItem);
        expect(scannableItems).toContainEqual(modifiedItem);
        expect(scannableItems).not.toContainEqual({itemName: "apple", unitType: 'pounds', price: 2.04});
    });

});