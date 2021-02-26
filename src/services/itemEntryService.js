const scannableItems = [];

const scannableItemSchema = {
    itemName: value => typeof value === 'string',
    price: value => typeof value === 'number',
    unitType: value => ['unit', 'pounds', 'ounces', 'gallons', 'quarts', 'pints', 'cups'].includes(value)
  };


  const validScannableItem = (item) => {
    const entries = Object.entries(scannableItemSchema);
    entries.map(([key, validate]) => {
      if(!validate(item[key])){
        throw new Error(`Scannable items must contain a valid ${key}`)
      }
    });
    return true;
  };

  const getScannableItemByName = (name) => {
    return scannableItems.filter(item => item.itemName === name);
  };

const addScannableItemToSystem = (item) => {
    if(validScannableItem(item)){
        const existingItem = getScannableItemByName(item.itemName);
        if(existingItem.length > 0){
            throw new Error(`${item.itemName} already exists in the scannable items list. Please modify the item instead of re-adding it.`);
        }
        scannableItems.push(item);
    }
};

const modifyScannableItemInSystem = (item) => {
    if(validScannableItem(item)){
        const index = scannableItems.findIndex((existingItem => existingItem.itemName === item.itemName));
        if(index === -1){
            throw new Error(`${item.itemName} is not in the scannable items list. Please add a new item instead of modifying.`)
        }
        scannableItems[index].price = item.price;
        scannableItems[index].unitType = item.unitType;
    }
};

module.exports = {
    scannableItems,
    addScannableItemToSystem,
    modifyScannableItemInSystem
}