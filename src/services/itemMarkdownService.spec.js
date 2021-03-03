import { addMarkDownToItem, removeMarkDownFromItem } from "./itemMarkdownService";
import {
    addScannableItemToSystem,
} from './itemEntryService.js';
import PointOfSale from '../classes/pointOfSale.js';

const baseItem = {
    itemName: 'fruit loops',
    unitType: 'unit', 
    price: 1.69
};

describe('addMarkDownToItem', () => {

    beforeEach(() => {
        PointOfSale.getInstance().scannableItems = [];
        PointOfSale.getInstance().specials = [];
        addScannableItemToSystem(baseItem);
    });

    test('when a valid item is marked down, the isMarkedDown flag is set to true', () => {
        addMarkDownToItem(baseItem.itemName, 0.50);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).isMarkedDown).toEqual(true);
    });

    test('when a valid item is marked down, priceReduction is set to the amount passed', () => {
        addMarkDownToItem(baseItem.itemName, 0.50);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).priceReduction).toEqual(0.50);
    });

    test('when a valid item is marked down, calculatePrice() returns a value that considers the markdown', () => {
        const priceReduction = 0.50;
        addMarkDownToItem(baseItem.itemName, 0.50);
        const expectedFinalPrice = baseItem.price - priceReduction;
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).calculatePrice(1)).toEqual(expectedFinalPrice);
    });

    test('an error is thrown when the item to be marked down does not exist in the POS system', () => {
        expect(() => { addMarkDownToItem('not a real item'); }
        ).toThrow(Error('not a real item must be added to the POS system before it can be marked down.'));
    });

    test('an error is thrown when the price reduction is not a number', () => {
        expect(() => { addMarkDownToItem(baseItem.itemName, 'not a number'); }
        ).toThrow(Error('priceReduction must be a number.'));
    });

   
});

describe('removeMarkDownFromItem', () => {

    beforeEach(() => {
        PointOfSale.getInstance().scannableItems = [];
        PointOfSale.getInstance().specials = [];
        addScannableItemToSystem(baseItem);
        addMarkDownToItem(baseItem.itemName, 0.50);
    });

    test('when a valid item is passed, the isMarkedDown flag is set to false', () => {
        removeMarkDownFromItem(baseItem.itemName);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).isMarkedDown).toEqual(false);
    });

    test('when a valid item is passed, priceReduction is set to 0', () => {
        removeMarkDownFromItem(baseItem.itemName);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).priceReduction).toEqual(0);
    });

    test('when a valid item is passed, calculatePrice() returns the base price with no markdowns', () => {
        removeMarkDownFromItem(baseItem.itemName);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).calculatePrice(1)).toEqual(baseItem.price);
    });

    test('an error is thrown when the item to remove a markdown from does not exist in the POS system', () => {
        expect(() => { removeMarkDownFromItem('not a real item'); }
        ).toThrow(Error('not a real item must be added to the POS system before a markdown can be removed.'));
    });
   
});