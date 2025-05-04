const categorizeItem = (item) => {
  const categories = [];

  const rules = [
    {
      category: 'Weapons',
      description:
        'Offensive items that enhance damage output and attack efficiency.',
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
      description:
        'Powerful gear that provides unique effects and boosts hero with special abilities or effects.',
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
      category: 'Armor',
      description:
        'Defensive items that enhance survivability and reduce incoming damage.',
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
      category: 'Magical',
      description:
        'Items that enhance magical abilities, spellcasting, or increase mana regeneration.',
      condition: (item) => item.abilities?.some((ability) => /(?:magic|spell|arcane|intelligence|mana burn|spell amp|resistance|wizardry|sorcery|mystic|ethereal|storm|mysticism)/i.test(
        ability.title,
      ))
        || item.attrib?.some((attr) => ['spell_amp', 'magic_resistance', 'bonus_intelligence'].includes(
          attr.key,
        ))
        || /magic/i.test(item.dname),
    },
    {
      category: 'Consumables',
      description:
        'Temporary items that are used once or have limited uses, providing short-term benefits.',
      condition: (item) => /(?:instant cast)/i.test(item.behavior)
        || /(?:potion|dust|tome|scroll|flask|bottle|ward|regen|charge)/i.test(
          item.dname,
        ),
    },

    {
      category: 'Neutral Items',
      description:
        'Special items found during gameplay that can be equipped by any hero, often with unique effects or abilities and provide strategic advantages.',
      // Note: This category is for items that are not specific to any hero or role.
      // They are often found in the jungle or dropped by neutral creeps.
      condition: (item) => /neutral/i.test(item.lore)
        || /(?:neutral|mango|vessel|gauntlet|scroll|tome|heart|mystic|greed)/i.test(
          item.dname,
        ),
    },
    {
      category: 'Attributes',
      description:
        'Items that enhance hero attributes such as strength, agility, or intelligence.',
      // Note: This category is for items that enhance hero attributes.
      // They are often used to increase a hero\'s primary attribute or provide additional stats.
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
      category: 'Boss Rewards',
      description:
        'Exclusive items obtained from defeating bosses or obtained as rewards completing specific challenges.',
      condition: (item) => /(?:boss|chest|diretide|labyrinth|legendary|reward|token|treasure)/i.test(
        item.lore,
      ),
    },
    {
      category: 'Supports',
      description:
        'Utility items designed for support heroes to assist allies in battle, enhancing their abilities or survivability.',
      condition: (item) => item.abilities?.some((ability) => /(?:heal|support|restore|regeneration|aura|shield|buff|barrier|protection|vision|ward|guardian)/i.test(
        ability.title,
      ))
        || item.attrib?.some((attr) => ['bonus_health_regen', 'bonus_mana_regen', 'bonus_armor'].includes(
          attr.key,
        )),
    },
    {
      category: 'Accessories',
      description:
        'Minor items that subtly enhance performance and efficiency, often worn or equipped by heroes.',
      condition: (item) => /(?:amulets?|rings?|talismans?|bracelets?|pendants?|medallions?|charms?)/i.test(
        item.dname,
      ),
    },
    {
      category: 'Recipes',
      description:
        'Components required to combine or to craft more powerful items.',
      condition: (item) => /recipe/i.test(item.dname)
        || item.components !== null
        || item.abilities?.some((ability) => /(?:combine|build|recipe|craft)/i.test(ability.title)),
    },

    {
      category: 'Collectible Items',
      description:
        'Cosmetic or unique items primarily for collection purposes. They are collectible in nature, often with unique lore or design.',
      condition: (item) => /collectible/i.test(item.lore)
        || /(?:compendium|token|treasure|achievement|bundle|skin|reward)/i.test(
          item.dname,
        ),
    },
  ];

  // Follow the rules
  rules.forEach(({ category, description, condition }) => {
    if (condition(item)) {
      categories.push({ category, description });
    }
  });

  return categories;
};

export default categorizeItem;
