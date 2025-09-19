const urlSpaceChecker = (stringParam) => {
  const stringWithoutSpaces = stringParam.replace(/\s/g, '');
  const firstLetter = stringWithoutSpaces.charAt(0).toLowerCase();
  return firstLetter + stringWithoutSpaces.slice(1);
};

export default urlSpaceChecker;
