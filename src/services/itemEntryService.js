const scannableItems = {};

const addScannableItemToSystem = (item) => {
    if(item.hasOwnProperty('item') && item.hasOwnProperty('price')){
        Object.assign(scannableItems, item);
    }else{
        throw new Error('Scannable items must contain an item name and a price.')
    }
   
};

module.exports = {
    scannableItems,
    addScannableItemToSystem
}