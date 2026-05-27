const isNotNumber = (value: string | number): boolean => {
  if (isNaN(Number(value))) {
    return true;
  } else {
    return false;
  }
};

export default isNotNumber;
