//sort array object by property name by asc
export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

//get distinct array object by property name
export function getDistinct(items: any[], propertyName: string) {
  if (items == null || items == undefined || items.length == 0) return [];
  return Array.from(new Set(items.map((item: any) => item[propertyName]))).map(id => {
    return items.find(r => r[propertyName] == id);
  });
}

//sort array object by property name by selected order
export function dynamicSortWithOrder(property, order = "asc") {
  return function innerSort(a, b) {
    const varA = (typeof a[property] === 'string')
      ? a[property].toUpperCase() : a[property];
    const varB = (typeof b[property] === 'string')
      ? b[property].toUpperCase() : b[property];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

export const groupBy = (key, array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const deepCopy = (obj) => {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function distinct<T>(list: T[], propertyName) {
  return list.filter((thing, i, arr) => {
    return arr.indexOf(arr.find(t => t[propertyName] === thing[propertyName])) === i
  });
}

export function replaceItemInArrayList<T>(array: T[], item: T, keyField: string) {
  if (!array || !array.length) { return [item]; }
  return array.map(gs => [item].find(x => x[keyField] === gs[keyField]) || gs);
}

export function addItemToArrayList<T>(array: T[], item: T, sortField?: string) {
  if (!array || !array.length) { return [item]; }
  return sortField ? array.concat([item]).sort(dynamicSortWithOrder(sortField)) : array.concat([item]);
}
