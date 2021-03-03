import ScannableItem from '../classes/scannableItem.js';
import PointOfSale from '../classes/pointOfSale.js';
import get from 'lodash.get';

const scannableItemSchema = {
    itemName: value => typeof value === 'string',
    price: value => typeof value === 'number',
    unitType: value => ['unit', 'pounds', 'ounces', 'gallons', 'quarts', 'pints', 'cups'].includes(value)
};

/**
 * Validates that the scannable item input is correctly formatted
 * @param  {Object} item Object that contains the scannable item's name, price, and unit type.
 * @throws {error}       If a property of the scannable item is not valid.
 */
const validateScannableItemInput = (item) => {
    const entries = Object.entries(scannableItemSchema);
    entries.map(([key, validate]) => {
        if(!validate(item[key])){
            throw new Error(`Scannable items must contain a valid ${key}`);
        }
    });
};

/**
 * Validates and adds a new item to the Point of Sale System.
 * @param  {Object} item Object that contains the scannable item's name, price, and unit type.
 * @throws {error}       If the item already exists in the Point of Sale system.
 */
export const addScannableItemToSystem = (item) => {
    validateScannableItemInput(item);
    const existingItem = PointOfSale.getInstance().retrieveScannableItemByName(item.itemName);
    if(!!existingItem){
        throw new Error(`${item.itemName} already exists in the POS system. Please modify the item instead of re-adding it.`);
    }
    const scannableItem = new ScannableItem(item);
    PointOfSale.getInstance().addScannableItem(scannableItem);
};

/**
 * Validates and modifies an existing item in the Point of Sale System.
 * @param  {Object} item Object that contains the scannable item's name, price, and unit type.
 * @throws {error}       If the item does not already exist in the Point of Sale system.
 */
export const modifyScannableItemInSystem = (item) => {
    validateScannableItemInput(item);
    const existingItem = PointOfSale.getInstance().retrieveScannableItemByName(get(item, 'itemName'));
    if(!existingItem){
        throw new Error(`${item.itemName} is not in the POS system. Please add a new item instead of modifying.`);
    }
    existingItem.unitType = item.unitType;
    existingItem.price = item.price;
};