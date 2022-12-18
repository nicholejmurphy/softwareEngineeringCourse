const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0);

const findMin = (...args) => Math.min(...args);

const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 }); // {a:1, b:2, c:3, d:4}

const doubleAndReturnArgs = (arr, ...values) => [
  ...arr,
  ...values.map((val) => val * 2),
];

const removeRandom = (items) => {
  let index = Math.floor(Math.random() * items.length);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

const extend = (array1, array2) => [...array1, ...array2];

const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val };
};

const removeKey = (obj, key) => {
  let newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

const update = (obj, key, val) => {
  return { ...obj, [key]: val };
};
