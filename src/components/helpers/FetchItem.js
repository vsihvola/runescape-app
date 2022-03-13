function FetchItem(itemName) {
  const saved = localStorage.getItem(itemName);
  const initialValue = JSON.parse(saved);
  //Logging
  //console.log(initialValue);
  return initialValue || '';
}

export default FetchItem;
