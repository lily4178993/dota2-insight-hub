/**
 * Categorizes a given item based on its attributes, abilities, and name.
 *
 * @param {Object} item - The item to categorize.
 * @param {string} item.dname - The display name of the item.
 * @param {Array<Object>} [item.abilities] - The abilities of the item.
 * @param {string} item.abilities[].title - The title of the ability.
 * @param {Array<Object>} [item.attrib] - The attributes of the item.
 * @param {string} item.attrib[].key - The key of the attribute.
 * @param {string} [item.behavior] - The behavior of the item.
 * @param {string} [item.lore] - The lore of the item.
 * @param {Array<string>} [item.components] - The components of the item.
 * @returns {Array<string>} - An array of categories the item belongs to.
 */
const categorizeItem = (item) => {
  const categories = [];

  const rules = [
    {
      category: 'Accessories',
      condition: (item) => /(?:amulets?|rings?|talismans?|bracelets?|pendants?|medallions?|charms?)/i.test(
        item.dname,
      ),
    },
    {
      category: 'Supports',
      condition: (item) => item.abilities?.some((ability) => /(?:heal|support|restore|regeneration|aura|shield|buff|barrier|protection|vision|ward|guardian)/i.test(
        ability.title,
      ))
        || item.attrib?.some((attr) => ['bonus_health_regen', 'bonus_mana_regen', 'bonus_armor'].includes(
          attr.key,
        )),
    },
    {
      category: 'Magical',
      condition: (item) => item.abilities?.some((ability) => /(?:magic|spell|arcane|intelligence|mana burn|spell amp|resistance|wizardry|sorcery|mystic|ethereal|storm|mysticism)/i.test(
        ability.title,
      ))
        || item.attrib?.some((attr) => ['spell_amp', 'magic_resistance', 'bonus_intelligence'].includes(
          attr.key,
        ))
        || /magic/i.test(item.dname),
    },
    {
      category: 'Armor',
      condition: (item) => item.attrib?.some((attr) => [
        'bonus_armor',
        'bonus_physical_resistance',
        'evasion',
        'damage_block',
      ].includes(attr.key))
        || /armor/i.test(item.dname)
        || item.abilities?.some((ability) => /(?:armor|physical|evasion|block|protection|guard|fortify|shield|barrier|plate|defense)/i.test(
          ability.title,
        )),
    },
    {
      category: 'Weapons',
      condition: (item) => item.attrib?.some((attr) => [
        'bonus_damage',
        'bonus_attack_damage',
        'damage',
        'bonus_attack_speed',
        'attack_damage',
        'bonus_physical_damage',
      ].includes(attr.key))
        || /(?:staff|axe|sword|blade)/i.test(item.dname)
        || item.abilities?.some((ability) => /(?:damage|attack|physical|strike|hit|blade|sword|axe|pierce|slash)/i.test(
          ability.title,
        )),
    },
    {
      category: 'Artifacts',
      condition: (item) => item.attrib?.some((attr) => [
        'bonus_health_regen',
        'bonus_mana_regen',
        'bonus_health',
        'bonus_mana',
        'bonus_intelligence',
        'bonus_strength',
        'bonus_agility',
      ].includes(attr.key))
        || /(?:staff|scepter|stone|talisman|crystal)/i.test(item.dname)
        || item.abilities?.some((ability) => /(?:regen|staff|talisman|artifact|crystal|power|intelligence|health|mana)/i.test(
          ability.title,
        )),
    },
    {
      category: 'Recipes',
      condition: (item) => /recipe/i.test(item.dname)
        || item.components !== null
        || item.abilities?.some((ability) => /(?:combine|build|recipe|craft)/i.test(ability.title)),
    },
    {
      category: 'Consumables',
      condition: (item) => /(?:instant cast)/i.test(item.behavior)
        || /(?:potion|dust|tome|scroll|flask|bottle|ward|regen|charge)/i.test(
          item.dname,
        ),
    },
    {
      category: 'Attributes',
      condition: (item) => item.attrib?.some((attr) => [
        'bonus_agility',
        'bonus_strength',
        'bonus_intelligence',
        'bonus_health_regen',
        'bonus_mana_regen',
        'bonus_damage',
      ].includes(attr.key)),
    },
    {
      category: 'Neutral Items',
      condition: (item) => /neutral/i.test(item.lore)
        || /(?:neutral|mango|vessel|gauntlet|scroll|tome|heart|mystic|greed)/i.test(
          item.dname,
        ),
    },
    {
      category: 'Collectible Items',
      condition: (item) => /collectible/i.test(item.lore)
        || /(?:compendium|token|treasure|achievement|bundle|skin|reward)/i.test(
          item.dname,
        ),
    },
    {
      category: 'Boss Rewards',
      condition: (item) => /(?:boss|chest|diretide|labyrinth|legendary|reward|token|treasure)/i.test(
        item.lore,
      ),
    },
  ];

  // Follow the rules
  rules.forEach(({ category, condition }) => {
    if (condition(item)) {
      categories.push(category);
    }
  });

  return categories;
};

export default categorizeItem;
