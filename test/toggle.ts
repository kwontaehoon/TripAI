export const toggleOneFlag = (
  state: boolean[],
  index: number,
): boolean[] => {
  const isActive = state[index];

  return state.map((_, i) => (i === index ? !isActive : false));
};
