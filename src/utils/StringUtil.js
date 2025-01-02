export const capitalizeFirstLetter = (str = '') => {
  if (str?.length === 0) {
    return str;
  } else if (str?.length <= 1) {
    return str.toUpperCase();
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
export const shortenText = (text, maxLength, converterOn = true) => {
  if (text.length > maxLength && converterOn) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};