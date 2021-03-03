import PointOfSale from './classes/pointOfSale.js';
import Order from './classes/order.js';
import {
    addScannableItemToSystem, 
    modifyScannableItemInSystem
} from './services/itemEntryService.js';
import { addMarkDownToItem} from './services/itemMarkdownService.js';
import {scanItem, getOrderTotal} from './services/itemScanningService.js';
import PercentDiscountSpecial from './classes/percentDiscountSpecial.js';
import FlatRateSpecial from './classes/flatRateSpecial.js';


/** 
 * Note: This project ONLY implements the library code. 
 * I created this file as a sandbox to show a little bit of the basic functionality that could be hooked up to a front end. 
 * However, this file does not demonstrate the usage of every method that I created and tested.
 * For complete information, please refer to the unit tests and the method documentation.
 */

//Create a new point of sale system.
const pointOfSale = new PointOfSale();

//Define several new items
const item1 = {
    itemName: 'soup',
    unitType: 'unit',
    price: 1.24
};

const item2 = {
    itemName: 'rye bread',
    unitType: 'unit',
    price: 1.79
};

const item3 = {
    itemName: 'turkey',
    unitType: 'pounds',
    price: 3.99
};

const item4 = {
    itemName: 'tomatoes',
    unitType: 'pounds',
    price: 1.00
};

const item5 = {
    itemName: 'hot chocolate',
    unitType: 'unit',
    price: 2.99
};

//Add the items to the POS system
addScannableItemToSystem(item1);
addScannableItemToSystem(item2);
addScannableItemToSystem(item3);
addScannableItemToSystem(item4);
addScannableItemToSystem(item5);

//modify the price of one of the items
modifyScannableItemInSystem({...item1, price: 1.27}); //soup now costs $1.27 instead of $1.24

//Add a markdown to an item
addMarkDownToItem('rye bread', 0.50); //rye bread is now marked down by $0.50

//Create a new Order
const order = new Order();

//Add an item to the order
scanItem('rye bread');

//Print out the running order total
console.log(`After adding rye bread, the order total is ${getOrderTotal()}.`); //Should be $1.29 after the base price of 1.79 and the markdown of $0.50.

//Add two units of another item to the order 
scanItem('soup', 2);

//Print out the running order total
console.log(`After adding 2 units of soup, the running order total is ${getOrderTotal()}.`); //Should be $3.83 after adding the rye bread at $1.29 and 2 units of soup at $1.27.

//Create a new percent discount special
const percentDiscountSpecialInput = {
    name: 'buy 2 get 1 50% off, limit 6',
    limit: 6,
    quantityNeededToTriggerSpecial: 2,
    quantityDiscounted: 1,
    percentageDiscount: 0.5
};

const percentDiscountSpecial = new PercentDiscountSpecial(percentDiscountSpecialInput);

//Add the special to an item
PointOfSale.getInstance().retrieveScannableItemByName('tomatoes').addSpecialToItem(percentDiscountSpecial);

//Add 6 poinds of tomatoes to the order. 
scanItem('tomatoes', 6);

//Print out the running order total
console.log(`After adding 6 pounds of tomatoes, the running order total is ${getOrderTotal()}.`); //Should be $8.83 after adding the tomatoes on special at $5 for 6 pounds

//Create a flat rate discount special
const flatRateSpecialInput = {
    name: '2 for $5.00',
    numberOfItems: 2,
    flatRate: 5.00
};

const flatRateSpecial = new FlatRateSpecial(flatRateSpecialInput);

//Add the special to an item
PointOfSale.getInstance().retrieveScannableItemByName('hot chocolate').addSpecialToItem(flatRateSpecial);

//Add 3 hot chocolates to the order
scanItem('hot chocolate', 3);

//Print out the running order total
console.log(`After adding 3 hot chocolates, the running order total is ${getOrderTotal()}.`); //Should be $16.82 after adding 3 hot chocolates on special at $5 for 2 or $2.99 each
