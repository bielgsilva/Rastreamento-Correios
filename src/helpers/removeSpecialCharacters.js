export const removeSpecialCharacters = (string) => {
  if (!string) return "";
  return string
    .toString()
    .replace(/[^0-9]/g, "")
    .replace(/\s/g, "");
};
