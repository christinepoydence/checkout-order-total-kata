const scannableItems = {};

const addScannableItemToSystem = (item) => {
    Object.assign(scannableItems, item);
};

module.exports = {
    scannableItems,
    addScannableItemToSystem
}