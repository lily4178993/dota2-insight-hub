const attributeDictionary = (attribute) => {
  switch (attribute) {
    case 'agi':
      return 'Agility';
    case 'int':
      return 'Intelligent';
    case 'str':
      return 'Strength';
    default:
      return 'Universal';
  }
};

export default attributeDictionary;
