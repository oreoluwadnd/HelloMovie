export const splitText = (text: string) => {
  return text.split(",").map((word) => word.trim());
};
