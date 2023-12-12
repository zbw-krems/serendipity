import { filterChainColors } from "./config";

export const replaceObjectByUID = (array, uidToFind, replacementObject) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].uid === uidToFind) {
      array[i] = replacementObject;
      return array; // Object replaced successfully
    }
  }
  return false; // Object with the specified UID not found
};

export const removeObjectByUID = (array, uidToRemove) => {
  //console.log(array, uidToRemove);
  const indexToRemove = array.findIndex((obj) => obj.uid === uidToRemove);
  if (indexToRemove !== -1) {
    array.splice(indexToRemove, 1);
    return array; // Object removed successfully
  }
  return false; // Object with the specified UID not found
};

export const findObjectByUID = (arrayOfObjects, uidToFind) => {
  // console.log(uidToFind);
  for (const obj of arrayOfObjects) {
    // console.log(obj.uid, uidToFind);
    if (obj.uid == uidToFind) {
      // console.log("FOUND", obj);
      return obj;
    }
  }
  // Return null if the object with the specified UID is not found
  return null;
};

export const htmlToElement = (html) => {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

export const htmlToElements = (html) => {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
};

export const extractUids = (arrayOfObjects) =>
  arrayOfObjects.map((obj) => obj.uid);

export const storeDataInLocalStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    // console.log(`Data stored successfully with key: ${key}`);
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

export const retrieveDataFromLocalStorage = (key) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData === null) {
      //console.log(`No data found for key: ${key}`);
      return null;
    }

    const data = JSON.parse(jsonData);
    // console.log(`Data retrieved successfully for key: ${key}`);
    return data;
  } catch (error) {
    // console.error("Error retrieving data from local storage:", error);
    return null;
  }
};

export const doesArrayContainMatchingUid = (array1, array2) => {
  // console.log("FUUU", array1, array2);
  const uidsInArray1 = new Set(array1.map((obj) => obj.uid));

  return array2.some((obj) => uidsInArray1.has(obj.uid));
};

export const findRecursiveObjectByUid = (uid, obj) => {
  if (obj.uid === uid) {
    return obj;
  }

  if (obj.children && obj.children.length > 0) {
    for (const child of obj.children) {
      const result = findRecursiveObjectByUid(uid, child);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export const returnObjectsFromUids = (ObjArray, UidArray) => {
  // console.log(ObjArray, UidArray);
  let returnArr = [];

  UidArray.map((uid) => {
    returnArr.push(ObjArray.find((obj) => obj.uid == uid));
  });

  return returnArr;
};

export const sortAlphabeticallyByTitle = (array) => {
  return array.sort((a, b) => {
    const titleA = a.title.toUpperCase(); // Ignore case during comparison
    const titleB = b.title.toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    // Titles are equal
    return 0;
  });
};

export const filterObjectsByKeywords = (objects, filterChain) => {
  // console.log(filterChain.keywords);
  let tempObjects = [];
  if (filterChain.keywords.length) {
    tempObjects = objects.filter((obj) =>
      [...filterChain.keywords].every((keyword) =>
        obj.keywords.some((objKeyword) => objKeyword.uid === keyword.uid)
      )
    );
    // console.log(`${filterChain.title} equals to `, tempObjects.length);
  }
  // console.log('FilterObjectsByKeywords - tempObject:', tempObjects)

  // console.log('FilterObjectsByKeywords - RetrunValue:', returnValue)
  return tempObjects;
};

export const getRandomColor = (index = 0) => {
  const randomIndex = Math.floor(Math.random() * filterChainColors.length);
  return index ? filterChainColors[index] : filterChainColors[randomIndex];
};
