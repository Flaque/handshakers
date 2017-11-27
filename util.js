export const newWith = (state, update) => {
  return Object.assign({}, state, update);
};

export const maybe = (item, defaultValue) => {
  return item || defaultValue;
};

export const add = (item, addition) => {
  return maybe(item, 0) + maybe(addition, 0);
};
