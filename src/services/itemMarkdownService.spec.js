import { addMarkDownToItem, removeMarkDownFromItem } from "./itemMarkdownService";
import {
    addScannableItemToSystem,
} from './itemEntryService.js';
import PointOfSale from '../classes/pointOfSale.js';

describe('addMarkDownToItem', () => {

    test('when a valid item is passed to addMarkDownToItem, the item is marked down', () => {
        const baseItem = {itemName: 'fruit loops', unitType: 'unit', price: 1.69};
        addScannableItemToSystem(baseItem);
        addMarkDownToItem(baseItem.itemName, 0.50);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName)).toEqual({...baseItem, isMarkedDown: true, priceReduction: 0.50});
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).calculatePrice()).toEqual(1.19);
    });

    test('when a valid item is passed to removeMarkDownFromItem, the item is marked as full price', () => {
        const baseItem = {itemName: 'fruit loops', unitType: 'unit', price: 1.69};
        removeMarkDownFromItem(baseItem.itemName);
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName)).toEqual({...baseItem, isMarkedDown: false, priceReduction: 0});
        expect(PointOfSale.getInstance().retrieveScannableItemByName(baseItem.itemName).calculatePrice()).toEqual(1.69);
    });

    test('an error is thrown when the item to be marked down does not exist in the POS system', () => {
        expect(() => { addMarkDownToItem('not a real item'); }
        ).toThrow(Error('not a real item must be added to the POS system before it can be marked down.'));
    });

    test('an error is thrown when the item to remove a markdown from does not exist in the POS system', () => {
      expect(() => { removeMarkDownFromItem('not a real item'); }
      ).toThrow(Error('not a real item must be added to the POS system before a markdown can be removed.'));
  });
   
});