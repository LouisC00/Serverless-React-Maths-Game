export const getFontSize = (question) => {
  const screenWidth = window.innerWidth;
  let baseSize = 28; // Base font size for larger screens

  if (screenWidth <= 320) {
    baseSize = 10;
  } else if (screenWidth <= 480) {
    baseSize = 12;
  } else if (screenWidth <= 660) {
    baseSize = 18;
  }

  if (question.length <= 10) {
    return baseSize;
  } else if (question.length <= 20) {
    return Math.max(baseSize - (question.length - 10) * 1, baseSize * 0.75);
  } else {
    return Math.max(baseSize - (question.length - 10) * 1.5, baseSize * 0.5);
  }
};
