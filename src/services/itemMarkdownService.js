import PointOfSale from '../classes/pointOfSale.js';

/**
 * Adds a markdown to a scannable item
 * @param  {String} itemName       the name of the scannable item
 * @param  {Number} priceReduction the amount to reduce the price by while the item is on markdown
 * @throws {error}                 if itemName is not a valid scannableItem
 */
export const addMarkDownToItem = (itemName, priceReduction) => {
    const itemToMarkdown = PointOfSale.getInstance().retrieveScannableItemByName(itemName);
    if(!itemToMarkdown){
        throw new Error(`${itemName} must be added to the POS system before it can be marked down.`);
    }
    itemToMarkdown.markDownItem(priceReduction);
};

/**
 * Removes a markdown from a scannable item
 * @param  {String} itemName       the name of the scannable item
 * @throws {error}                 if itemName is not a valid scannableItem
 */
export const removeMarkDownFromItem = (itemName) => {
    const item = PointOfSale.getInstance().retrieveScannableItemByName(itemName);
    if(!item){
        throw new Error(`${itemName} must be added to the POS system before a markdown can be removed.`);
    }
    item.removeMarkDown();
};

