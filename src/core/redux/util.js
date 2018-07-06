/**
 * Converts an array object to a single object.
 *
 * e.g. [{id: 1, value: "one"}, {id: 2, value: "two"}]
 * is converted to :
 * {1: {id: 1, value: "one"}, 2: {id: 2, value: "two"}}
 *
 * @param array - Array of object to convert to an object.
 * @param idName - name if the ID attribute - optional
 *
 */
export const arrayToObject = (array, idName = "id") => {
  return array.reduce((obj, item) => {
    const id = item[idName];
    obj[id] = item;
    return obj;
  }, {});
};

/**
 * Converts an object to another object which contains an attribute, keyed by the original objects ID & has its value.
 *
 * e.g. {id: 1, value: "one"} is converted to {1: {id: 1, value: "one"}}
 *
 * @param object - Object to convert into keyed object
 * @param idName - name if the ID attribute - optional
 */
export const objectToIDKeyedObject = (obj, idName = "id") => {
  const id = obj[idName];
  return {
    [id]: obj
  };
};

/**
 * Adds the item into an array & sorts
 * @param {*} array
 * @param {*} item
 * @returns a new sorted array
 */
export const addToArrayAndSort = (array, item) => {
  let newArray = [...array];
  if (!newArray.includes(item)) {
    newArray.push(item);
    newArray.sort();
  }
  return newArray;
};
