const attackDamageCalculation = (
  primaryAttribute,
  baseAttackDamage,
  agilityScaling,
  strengthScaling,
  intelligenceScaling,
) => {
  switch (primaryAttribute) {
    case 'agi':
      return (baseAttackDamage + agilityScaling).toFixed(1);
    case 'int':
      return (baseAttackDamage + intelligenceScaling).toFixed(1);
    case 'str':
      return (baseAttackDamage + strengthScaling).toFixed(1);
    default:
      return (
        baseAttackDamage
        + (agilityScaling + intelligenceScaling + strengthScaling) * 0.7
      ).toFixed(1);
  }
};

export default attackDamageCalculation;
