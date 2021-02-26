const scannableItems = {};

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
  }

const addScannableItemToSystem = (item) => {
    if(validScannableItem(item)){
        Object.assign(scannableItems, item);
    }
};

module.exports = {
    scannableItems,
    addScannableItemToSystem
}