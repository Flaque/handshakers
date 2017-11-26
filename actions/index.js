// Action names
export const ADD_HANDSHAKES = "ADD_HANDSHAKES";

// Action creators
export const addHandshakes = (number) => {
  return { type: ADD_HANDSHAKES, number: number };
};
