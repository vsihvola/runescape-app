function StoreItem(itemName, value) {
  // storing input name
  localStorage.setItem(itemName, JSON.stringify(value));
}

export default StoreItem;
