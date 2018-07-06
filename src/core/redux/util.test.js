import {
  arrayToObject,
  objectToIDKeyedObject,
  addToArrayAndSort
} from "./util";

describe("Redux util", () => {
  it("can convert an array to a keyed object", () => {
    const array = [
      {
        id: 1,
        value: "one"
      },
      {
        id: 2,
        value: "two"
      }
    ];

    const expectedObject = {
      1: {
        id: 1,
        value: "one"
      },
      2: {
        id: 2,
        value: "two"
      }
    };
    expect(arrayToObject(array)).toEqual(expectedObject);
  });

  it("can convert an array to a keyed object using a different ID attribute name", () => {
    const array = [
      {
        x: 1,
        value: "one"
      },
      {
        x: 2,
        value: "two"
      }
    ];

    const expectedObject = {
      1: {
        x: 1,
        value: "one"
      },
      2: {
        x: 2,
        value: "two"
      }
    };
    expect(arrayToObject(array, "x")).toEqual(expectedObject);
  });

  it("can convert an object into a keyed object", () => {
    const object = {
      id: 1,
      value: "one"
    };

    const expectedObject = {
      1: {
        id: 1,
        value: "one"
      }
    };
    expect(objectToIDKeyedObject(object)).toEqual(expectedObject);
  });

  it("can convert an object into a keyed object using a different attribute name", () => {
    const object = {
      x: 1,
      value: "one"
    };

    const expectedObject = {
      1: {
        x: 1,
        value: "one"
      }
    };
    expect(objectToIDKeyedObject(object, "x")).toEqual(expectedObject);
  });

  it("can add an object to a new array & sort the array", () => {
    const array = [4, 3, 2, 1];
    const expectedArray = [1, 2, 3, 4, 5];
    const sortArrayWithAddedItem = addToArrayAndSort(array, 5);
    expect(sortArrayWithAddedItem).not.toBe(array);
    expect(sortArrayWithAddedItem).toEqual(expectedArray);
    expect(array).toEqual(array);
  });

  it("addToArrayAndSort won't add duplicates", () => {
    const array = [1, 2];
    const expectedArray = [1, 2];
    const sortArrayWithAddedItem = addToArrayAndSort(array, 2);
    expect(sortArrayWithAddedItem).not.toBe(array);
    expect(sortArrayWithAddedItem).toEqual(expectedArray);
    expect(array).toEqual(array);
  });
});
