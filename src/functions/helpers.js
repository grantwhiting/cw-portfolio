const getRandomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getFilterParam = (param) => param.substr(1).replace("filter=", "");

export { getRandomIntFromInterval, getFilterParam };
