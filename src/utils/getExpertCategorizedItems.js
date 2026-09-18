/* eslint-disable max-len */
/**
 * Categorizes a list of Dota 2 item objects into expert-defined categories for advanced users.
 *
 * The function evaluates each item against an internal set of rules by:
 * - checking attribute key (item.attrib is expected to be an array of objects with a `key` string property),
 * - searching keywords inside item name, description, lore and notes,
 * - running logical checks and a case-sensitive RegExp match,
 * - and excluding certain items based on specific keywords or properties.
 *
 * Notes:
 * - This function does not modify the input items.
 * - The rules are heuristic and may not be perfect.
 * - Matching is case-sensitive.
 * - An item may apppear multiple time if it matches multiple categories.
 *
 * @param {Array<Object>} items - Array of item objects to categorize. Each item may contain at least:
 *  - {string} dname - Display name of the item (used for keyword/exclusion regexes).
 *  - {Array<Object>} [attrib] - Attribute list; each attribute object should expose a `key` string (e.g. "bonus_damage").
 *  - {Array<Object>} [abilities] - Ability list; each ability may have `title` and/or `description` strings.
 *  - {string} [qual] - Item quality string (e.g. "epic").
 *  - {string} [behavior] - Item behavior string (e.g. "instant cast").
 *  - {boolean} [ItemIsNeutralDrop] - Neutral drop flag.
 *  - {number} [tier] - Neutral item tier (1..5).
 *  - {string} [lore] - Lore text used by some category rules.
 *  - {string} [notes] - Additional notes/description text used for keyword matching.
 *
 * @returns {{
 *   items: Array<{ item: Object, expertCategory: string, description: string }>,
 *   categories: Array<{ category: string, description: string }>
 * }}
 *   An object containing:
 *   - `items`: an array of matched results where each element contains:
 *       - `item`: the original input item object that satisfied a rule,
 *       - `expertCategory`: the category name assigned by the matching rule (e.g. "Weapons", "Artifacts", "Armor", ...),
 *       - `description`: the human-readable description for that category.
 *   - `categories`: the list of available categories (name + description) derived from the internal rule definitions.
 *
 * @example
 * // const result = getExpertCategorizedItems(itemsData);
 * // result.items => [{ dname: 'My Item', expertCategory: { category: 'Weapons', description: '...' } }, ...]
 *
 * @pure
 * @since 2.0.0
 */
const getExpertCategorizedItems = (items) => {
  const rules = [
    {
      category: 'Weapons',
      description:
        'Offensive items that enhance damage output and attack efficiency.',
      condition: (item) => {
        const offensiveAttribs = [
          'bonus_damage',
          'bonus_attack_damage',
          'damage',
          'bonus_attack_speed',
          'attack_damage',
          'bonus_physical_damage',
          'crit_chance',
          'crit_multiplier',
          'lifesteal_percent',
          'cleave_damage_percent',
          'spell_amp',
        ];

        const offensiveKeywords = /(?:damage|attack|crit|cleave|lifesteal|amplify|strike|hit|pierce|slash)/i;

        const weaponKeywords = /(?:blade|axe|sword|staff|maul|bar|desolator|maelstrom|mjollnir|rapier)/i;

        const isExcluded = /(?:recipe|force|eul|glimmer|ghost|cyclone)/i.test(
          item.dname,
        );

        const isWeapon = item.attrib?.some((attr) => offensiveAttribs.includes(attr.key))
          || weaponKeywords.test(item.dname)
          || item.abilities?.some((ability) => offensiveKeywords.test(ability.title || ability.description));

        return isWeapon && !isExcluded;
      },
    },
    {
      category: 'Artifacts',
      description:
        'Powerful gear that provides unique effects and boosts hero with special abilities or effects.',
      condition: (item) => {
        const artifactAttribs = [
          'bonus_health_regen',
          'bonus_mana_regen',
          'bonus_health',
          'bonus_mana',
          'bonus_intelligence',
          'bonus_strength',
          'bonus_agility',
          'spell_amp',
          'status_resistance',
          'magic_resistance',
          'cooldown_reduction',
          'cast_range_bonus',
          'mana_cost_reduction',
        ];

        const artifactKeywords = /(?:staff|scepter|stone|talisman|crystal|orb|disk|sphere|core|shard)/i;

        const abilityKeywords = /(?:regen|staff|talisman|artifact|crystal|power|intelligence|health|mana|cooldown|resistance|amplify)/i;

        const isExcluded = /(?:recipe|headdress|basilius|soul ring|buckler|urn)/i.test(
          item.dname,
        );

        const isArtifact = item.attrib?.some((attr) => artifactAttribs.includes(attr.key))
          || artifactKeywords.test(item.dname)
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        return isArtifact && !isExcluded;
      },
    },
    {
      category: 'Armor',
      description:
        'Defensive items that enhance survivability and reduce incoming damage.',
      condition: (item) => {
        const armorAttribs = [
          'bonus_armor',
          'bonus_physical_resistance',
          'evasion',
          'damage_block',
          'magic_resistance',
          'status_resistance',
          'bonus_health_regen',
          'bonus_health',
        ];

        const armorKeywords = /(?:armor|guard|shield|barrier|plate|cloak|pipe|disk|orb|vanguard|buckler|insight)/i;

        const abilityKeywords = /(?:armor|physical|evasion|block|protection|guard|fortify|shield|barrier|plate|defense|resistance|absorb|reduce)/i;

        const isExcluded = /(?:recipe|attack|quarterstaff|damage|maelstrom|desolator)/i.test(
          item.dname,
        );

        const isArmor = item.attrib?.some((attr) => armorAttribs.includes(attr.key))
          || armorKeywords.test(item.dname)
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        return isArmor && !isExcluded;
      },
    },
    {
      category: 'Magical',
      description:
        'Items that enhance magical abilities, spellcasting, or increase mana regeneration.',
      condition: (item) => {
        const magicalAttribs = [
          'spell_amp',
          'magic_resistance',
          'bonus_intelligence',
          'mana_regen',
          'bonus_mana',
          'mana_cost_reduction',
          'cast_range_bonus',
          'cooldown_reduction',
        ];

        const magicalKeywords = /(?:magic|arcane|aether|octarine|kaya|null|dagon|eul|lens|sorcery|wizardry|mystic|ethereal|spell)/i;

        const abilityKeywords = /(?:magic|spell|arcane|intelligence|mana burn|spell amp|resistance|wizardry|sorcery|mystic|ethereal|storm|mysticism|mana|cooldown|cast)/i;

        const isExcluded = /(?:magic wand|magic stick|clarity|tango|salve)/i.test(item.dname);

        const isMagical = item.attrib?.some((attr) => magicalAttribs.includes(attr.key))
          || magicalKeywords.test(item.dname)
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        return isMagical && !isExcluded;
      },
    },
    {
      category: 'Consumables',
      description:
        'Temporary items that are used once or have limited uses, providing short-term benefits.',
      condition: (item) => {
        const consumableKeywords = /(?:potion|dust|tome|scroll|flask|bottle|ward|regen|charge|salve|clarity|mango|faerie|smoke|cheese|lotus|refresher shard)/i;

        const abilityKeywords = /(?:restore|consume|place|vision|temporary|charges|duration|heal|mana)/i;

        const isExcluded = /(?:magic wand|soul ring|basilius|buckler)/i.test(
          item.dname,
        );

        const hasConsumableAttribs = item.attrib?.some((attr) => [
          'charges',
          'initial_charges',
          'duration',
          'health_restore',
          'mana_restore',
        ].includes(attr.key));

        const hasConsumableAbility = item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        const isConsumable = /Consumable/i.test(item.qual)
          || /instant cast/i.test(item.behavior)
          || consumableKeywords.test(item.dname)
          || hasConsumableAttribs
          || hasConsumableAbility;

        return isConsumable && !isExcluded;
      },
    },
    {
      category: 'Neutral Items',
      description:
        'Special items found during gameplay that can be equipped by any hero, often with unique effects or abilities and provide strategic advantages.',
      // They are often found in the jungle or dropped by neutral creeps.
      condition: (item) => {
        const neutralItemKeywords = /(?:neutral|vessel|gauntlet|heart|mystic|greed|mirror|cloak|ring|amulet|trinket|tunic|boots|lens|whistle|titan|flicker|quiver|pupils|spider|elixir)/i;

        const abilityKeywords = /(?:passive|trigger|aura|neutral|cooldown|unique|tier)/i;

        const isExcluded = /(?:recipe|enchanted mango|tome of knowledge|scroll of teleportation|clarity|salve|ward)/i.test(
          item.dname,
        );

        const isNeutral = item.ItemIsNeutralDrop === true
          || (item.tier >= 1 && item.tier <= 5)
          || /neutral/i.test(item.lore)
          || neutralItemKeywords.test(item.dname)
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        return isNeutral && !isExcluded;
      },
    },
    {
      category: 'All Attributes',
      description:
        'Items that enhance hero attributes such as strength, agility, or intelligence.',
      condition: (item) => {
        const attributeKeys = [
          'bonus_agility',
          'bonus_strength',
          'bonus_intellect',
          'bonus_intelligence',
          'bonus_all_stats',
          'bonus_health_regen',
          'bonus_mana_regen',
          'bonus_damage',
          'bonus_attack_speed',
          'bonus_health',
          'bonus_mana',
        ];

        const attributeKeywords = /(?:wraith band|bracer|null talisman|ultimate orb|point booster|ogre axe|blade of alacrity|staff of wizardry|circlet|gauntlets|slippers|mantle)/i;

        const abilityKeywords = /(?:strength|agility|intelligence|stats|attribute|boost|regen|damage)/i;

        const isExcluded = /(?:recipe|maelstrom|mask of madness|echo sabre|desolator|battle fury)/i.test(
          item.dname,
        );

        const isAttribute = item.attrib?.some((attr) => attributeKeys.includes(attr.key))
          || attributeKeywords.test(item.dname)
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description));

        return isAttribute && !isExcluded;
      },
    },
    {
      category: 'Agility',
      description: 'Items that enhance agility, attack speed, and evasion.',
      condition: (item) => {
        const agilityAttribs = [
          'bonus_agility',
          'bonus_attack_speed',
          'evasion',
          'bonus_movement_speed',
        ];
        const isExcluded = /(maelstrom|mask of madness|echo sabre|desolator|battle fury)/i.test(
          item.dname,
        );

        const isAgility = item.attrib?.some((attr) => agilityAttribs.includes(attr.key));

        return isAgility && !isExcluded;
      },
    },
    {
      category: 'Strength',
      description: 'Items that enhance strength, health, and durability.',
      condition: (item) => {
        const strengthAttribs = [
          'bonus_strength',
          'bonus_health',
          'bonus_health_regen',
          'status_resistance',
        ];
        const isExcluded = /(?:recipemaelstrom|mask of madness|echo sabre|desolator|battle fury)/i.test(
          item.dname,
        );

        const isStrength = item.attrib?.some((attr) => strengthAttribs.includes(attr.key));

        return isStrength && !isExcluded;
      },
    },
    {
      category: 'Intelligence',
      description:
        'Items that enhance intelligence, mana pool, and spellcasting.',
      condition: (item) => {
        const intelligenceAttribs = [
          'bonus_intellect',
          'bonus_intelligence',
          'bonus_mana',
          'bonus_mana_regen',
          'spell_amp',
          'cast_range_bonus',
        ];

        const intelligenceKeywords = /intelligence|wizard|mystic|arcane/i;

        const isExcluded = /(?:recipe|maelstrom|mask of madness|echo sabre|desolator|battle fury)/i.test(
          item.dname,
        );

        const isIntelligence = item.attrib?.some((attr) => intelligenceAttribs.includes(attr.key))
          || intelligenceKeywords.test(item.dname);

        return isIntelligence && !isExcluded;
      },
    },
    {
      category: 'Boss Rewards',
      description:
        'Exclusive items obtained from defeating bosses or obtained as rewards completing specific challenges.',
      condition: (item) => {
        const loreKeywords = /(?:boss|chest|diretide|labyrinth|legendary|reward|token|treasure)/i;

        const bossItemKeywords = /(?:blessing|refresher shard|cheese|fangs|essence|shard|relic|crown|trophy)/i;

        const abilityKeywords = /(?:legendary|challenge|event|exclusive|boss|reward)/i;

        return (
          loreKeywords.test(item.lore)
          || bossItemKeywords.test(item.dname)
          || item.tier >= 5
          || item.ItemIsNeutralDrop === true
          || item.abilities?.some((ability) => abilityKeywords.test(ability.title || ability.description))
        );
      },
    },
    {
      category: 'Supports',
      description:
        'Utility items designed for support heroes to assist allies in battle, enhancing their abilities or survivability.',
      condition: (item) => {
        const supportAttribs = [
          'aura_health_regen',
          'aura_mana_regen',
          'aura_armor',
          'bonus_armor',
          'bonus_health',
          'bonus_mana',
          'bonus_health_regen',
          'bonus_mana_regen',
          'bonus_vision',
          'cast_range_bonus',
          'cooldown_reduction',
          'mana_regen',
          'magic_resistance',
          'status_resistance',
        ];

        const supportKeywords = /(?:heal|support|restore|regeneration|aura|shield|buff|barrier|protection|vision|ward|guardian|assist|team|dispel|save|reveal)/i;
        const isExcluded = /(?:recipe|rapier|daedalus|butterfly|desolator|battle fury|satanic|mask of madness|echo sabre|maelstrom)/i;

        const isSupportItem = item.attrib?.some((attr) => supportAttribs.includes(attr.key))
          || supportKeywords.test(item.dname)
          || item.abilities?.some((ability) => supportKeywords.test(ability.title || ability.description));

        return isSupportItem && !isExcluded;
      },
    },
    {
      category: 'Accessories',
      description:
        'Minor items that subtly enhance performance and efficiency, often worn or equipped by heroes.',
      condition: (item) => {
        const accessoryAttribs = [
          'bonus_all_stats',
          'bonus_mana_regen',
          'bonus_health_regen',
          'magic_resistance',
        ];

        const accessoryKeywords = /(?:amulet|ring|talisman|bracelet|pendant|medallion|charm|circlet|basilius|null|wraith|bracer)/i;

        const isExcluded = /(?:recipe|ring of health|ring of regen|soul ring)/i.test(item.dname);

        const isAccessory = item.attrib?.some((attr) => accessoryAttribs.includes(attr.key))
          || accessoryKeywords.test(
            item.dname || item.lore || item.notes || item.description,
          );

        return isAccessory && !isExcluded;
      },
    },
  ];

  const categorizedItems = [];
  rules.forEach((rule) => {
    const matchedItems = items.filter((item) => rule.condition(item));
    matchedItems.forEach((item) => {
      categorizedItems.push({
        item,
        expertCategory: rule.category,
        description: rule.description,
      });
    });
  });

  return {
    items: categorizedItems,
    categories: rules.map(({ category, description }) => ({
      category,
      description,
    })),
  };
};

export default getExpertCategorizedItems;
