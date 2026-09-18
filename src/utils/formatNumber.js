/**
 * Convert a CSS length (rem, px, em, etc.) into a value string
 *
 * @param {string|number} spacing - e.g. "0.5rem", "8px", 1.25
 * @param {number} divisor - divide the numeric part by this (default 1 = no change)
 * @param {string} defaultUnit - used if spacing is a number without a unit
 * @returns {string} - value with unit, ready for CSS var
 */
function formatNumber(spacing, divisor = 1, defaultUnit = 'rem') {
  // If already a number, treat it as unitless and append defaultUnit
  if (typeof spacing === 'number') {
    return `${spacing / divisor}${defaultUnit}`;
  }

  // Extract numeric value and unit from string
  const match = spacing.trim().match(/^([\d.]+)([a-z%]*)$/i);
  if (!match) {
    throw new Error(`Invalid spacing value: "${spacing}"`);
  }

  const [, numStr, unit] = match;
  const num = parseFloat(numStr);
  const resolvedUnit = unit || defaultUnit;

  return `${num / divisor}${resolvedUnit}`;
}

export default formatNumber;
