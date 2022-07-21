export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const round2 = (num) =>
  Math.round(Number(num) * 100 + Number.EPSILON) / 100;

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
