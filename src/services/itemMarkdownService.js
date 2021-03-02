import PointOfSale from '../classes/pointOfSale.js';

export const addMarkDownToItem = (itemName, priceReduction) => {
    const itemToMarkdown = PointOfSale.getInstance().retrieveScannableItemByName(itemName);
    if(!itemToMarkdown){
        throw new Error(`${itemName} must be added to the POS system before it can be marked down.`);
    }
    itemToMarkdown.markDownItem(priceReduction);
};

export const removeMarkDownFromItem = (itemName) => {
    const item = PointOfSale.getInstance().retrieveScannableItemByName(itemName);
    if(!item){
        throw new Error(`${itemName} must be added to the POS system before a markdown can be removed.`);
    }
    item.removeMarkDown();
};

