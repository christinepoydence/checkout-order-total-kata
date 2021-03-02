import ScannableItem from '../classes/scannableItem.js';
import PointOfSale from '../classes/pointOfSale.js';
import get from 'lodash.get';

const scannableItemSchema = {
    itemName: value => typeof value === 'string',
    price: value => typeof value === 'number',
    unitType: value => ['unit', 'pounds', 'ounces', 'gallons', 'quarts', 'pints', 'cups'].includes(value)
};

const validateScannableItemInput = (item) => {
    const entries = Object.entries(scannableItemSchema);
    entries.map(([key, validate]) => {
        if(!validate(item[key])){
            throw new Error(`Scannable items must contain a valid ${key}`);
        }
    });
    return true;
};

export const addScannableItemToSystem = (item) => {
    validateScannableItemInput(item);
    const existingItem = PointOfSale.getInstance().retrieveScannableItemByName(item.itemName);
    if(!!existingItem){
        throw new Error(`${item.itemName} already exists in the POS system. Please modify the item instead of re-adding it.`);
    }
    const scannableItem = new ScannableItem(item);
    PointOfSale.getInstance().addScannableItem(scannableItem);
};

export const modifyScannableItemInSystem = (item) => {
    validateScannableItemInput(item);
    const existingItem = PointOfSale.getInstance().retrieveScannableItemByName(get(item, 'itemName'));
    if(!existingItem){
        throw new Error(`${item.itemName} is not in the POS system. Please add a new item instead of modifying.`);
    }
    existingItem.unitType = item.unitType;
    existingItem.price = item.price;
};