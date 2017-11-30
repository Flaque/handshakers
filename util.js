export const maybe = (item, def) => {
  return item || def;
};

export const newWith = (state, update) => {
  return Object.assign({}, state, update);
};
