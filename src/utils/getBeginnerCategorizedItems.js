/**
 * Categorizes a list of Dota 2 item objects into beginner-friendly categories.
 *
 * The function applies a set of deterministic rules (Carry, Support, Initiator,
 * Disabler, Nuker, Durable, Escape, Pusher) to each item. Each rule tests an item
 * by:
 *  - checking attrib keys (item.attrib is expected to be an array of objects with a `key` string),
 *  - searching for keywords inside ability titles/descriptions (item.abilities is expected
 *    to be an array of objects with optional `title` and `description` strings),
 *  - running a case-insensitive RegExp against the item's display name (item.dname).
 * Rules also include exclusion regexes on item.dname to filter out misleading matches.
 *
 * Notes:
 *  - Matching is case-insensitive for ability text and name regexes.
 *  - An item that matches multiple categories will appear once per matching category
 *    (i.e., the returned items array can contain duplicates of the same original item,
 *    each annotated with a different beginnerCategory).
 *  - The function does not mutate the original item objects; it pushes a shallow copy
 *    extended with a `beginnerCategory` property.
 *  - The order of categories in the returned `categories` array mirrors the internal rule order.
 *
 * @param {Array<Object>} items - Array of item objects to categorize. Each item should
 * at minimum include:
 *   - {string} dname - display name of the item (used for regex matching and exclusions)
 *   - {Array<{key: string, [any]: any}>} [attrib] - optional array of attribute entries;
 *     rule checks `attrib.key`
 *   - {Array<{title?: string, description?: string, [any]: any}>} [abilities] - optional
 *     array of ability entries; rule searches title/description text
 *   - {...any} [otherProps] - any other properties are preserved and copied to the returned objects
 *
 * @returns {{ items: Array<Object & { beginnerCategory: { category: string,
 * description: string } }>, categories: Array<{ category: string, description: string }> }}
 *   An object containing:
 *   - items: an array of item objects that matched one or more rules. Each returned item
 *     is a shallow copy of the original with an added `beginnerCategory` property describing
 *     which rule matched.
 *   - categories: an array of the available beginner categories (category name and
 *     description), derived from the internal rule set.
 *
 * @example
 * // const result = getBeginnerCategorizedItems(itemsData);
 * // result.items => [{ dname: 'Blink Dagger', ..., beginnerCategory: { category: 'Initiator',
 * // description: '...' } }, ...]
 *
 * @pure
 * @since 2.0.0
 */
const getBeginnerCategorizedItems = (items) => {
  const rules = [
    {
      category: 'Carry',
      description:
        'Items that help carry heroes scale damage, farm efficiently, and dominate late game.',
      condition: (item) => {
        const carryAttribs = [
          'bonus_damage',
          'bonus_attack_speed',
          'crit_chance',
          'crit_multiplier',
          'lifesteal_percent',
          'cleave_damage_percent',
          'attack_damage',
          'bonus_physical_damage',
          'true_strike',
        ];

        const carryAbilities = [
          'cleave',
          'crit',
          'lifesteal',
          'bash',
          'true strike',
          'damage amp',
        ];

        const carryNames = /(?:desolator|maelstrom|mjollnir|rapier|butterfly|daedalus|monkey king bar|satanic|battle fury|echo sabre|armlet)/i;

        const isExcluded = /(?:recipe|mekansm|pipe|glimmer|force|eul|cyclone|lotus|guardian greaves)/i.test(
          item.dname,
        );

        const isCarryItem = item.attrib?.some((attr) => carryAttribs.includes(attr.key))
          || item.abilities?.some((ability) => carryAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || carryNames.test(item.dname);

        return isCarryItem && !isExcluded;
      },
    },
    {
      category: 'Support',
      description:
        'Items that help support heroes protect allies, provide vision, and sustain the team.',
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

        const supportAbilities = [
          'heal',
          'support',
          'restore',
          'regeneration',
          'aura',
          'shield',
          'buff',
          'barrier',
          'protection',
          'vision',
          'guardian',
          'assist',
          'dispel',
          'save',
          'reveal',
          'ward',
          'team',
        ];

        const supportNames = /(?:mekansm|guardian greaves|glimmer cape|force staff|eul|lotus orb|pipe|arcane boots|tranquil boots|ward|dust|smoke)/i;

        const isExcluded = /(?:recipe|rapier|daedalus|butterfly|desolator|battle fury|satanic|mask of madness|echo sabre|maelstrom)/i.test(
          item.dname,
        );

        const isSupportItem = item.attrib?.some((attr) => supportAttribs.includes(attr.key))
          || item.abilities?.some((ability) => supportAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || supportNames.test(item.dname);

        return isSupportItem && !isExcluded;
      },
    },
    {
      category: 'Initiator',
      description:
        'Items that help heroes start fights with mobility, control, or disruptive effects.',
      condition: (item) => {
        const mobilityAttribs = [
          'bonus_movement_speed',
          'active_blink_range',
          'cast_range_bonus',
          'bonus_status_resistance',
        ];

        const initiationAbilities = [
          'blink',
          'stun',
          'root',
          'silence',
          'taunt',
          'knockback',
          'pull',
          'displacement',
        ];

        const initiationNames = /(?:blink dagger|overwhelming blink|force staff|eul|cyclone|shadow blade|silver edge|wind waker|heaven's halberd|nullifier|abyssal blade)/i;

        const isExcluded = /(?:recipe|mekansm|guardian greaves|pipe|ward|dust|rapier)/i.test(
          item.dname,
        );

        const isInitiatorItem = item.attrib?.some((attr) => mobilityAttribs.includes(attr.key))
          || item.abilities?.some((ability) => initiationAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || initiationNames.test(item.dname);

        return isInitiatorItem && !isExcluded;
      },
    },
    {
      category: 'Disabler',
      description:
        'Items that restrict enemy actions through stuns, silences, hexes, or other disables.',
      condition: (item) => {
        const disableKeywords = [
          'stun',
          'root',
          'silence',
          'hex',
          'taunt',
          'disarm',
          'mute',
          'bash',
          'disable',
        ];

        const disableNames = /(?:abyssal blade|scythe of vyse|nullifier|heaven's halberd|orchid|bloodthorn|rod of atos|sheepstick|cyclone|eul)/i;

        const isExcluded = /(?:recipe|mekansm|guardian greaves|pipe|ward|dust|rapier|battle fury)/i.test(
          item.dname,
        );

        const isDisablerItem = item.abilities?.some((ability) => disableKeywords.some((keyword) => (ability.title || ability.description || '')
          .toLowerCase()
          .includes(keyword))) || disableNames.test(item.dname);

        return isDisablerItem && !isExcluded;
      },
    },
    {
      category: 'Nuker',
      description:
        'Items that boost spell damage, reduce cooldowns, and help heroes burst enemies with magic.',
      condition: (item) => {
        const nukerAttribs = [
          'spell_amp',
          'bonus_intellect',
          'bonus_intelligence',
          'bonus_mana',
          'bonus_mana_regen',
          'cooldown_reduction',
          'cast_range_bonus',
        ];

        const nukerAbilities = [
          'amplify spell damage',
          'mana restore',
          'cooldown reduction',
          'burst',
          'magic damage',
        ];

        const nukerNames = /(?:dagon|veil of discord|kaya|kaya and sange|octarine core|ethereal blade|aghanim|eul|cyclone|arcane boots|refresher orb)/i;

        const isExcluded = /(?:recipe|battle fury|desolator|butterfly|satanic|guardian greaves|pipe)/i.test(
          item.dname,
        );

        const isNukerItem = item.attrib?.some((attr) => nukerAttribs.includes(attr.key))
          || item.abilities?.some((ability) => nukerAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || nukerNames.test(item.dname);

        return isNukerItem && !isExcluded;
      },
    },
    {
      category: 'Durable',
      description:
        'Items that help heroes survive longer by increasing health, resistances, and sustain.',
      condition: (item) => {
        const durableAttribs = [
          'bonus_health',
          'bonus_armor',
          'bonus_magic_resistance',
          'bonus_health_regen',
          'status_resistance',
          'damage_block',
          'evasion',
        ];

        const durableAbilities = [
          'damage reduction',
          'health regen',
          'magic resistance',
          'armor bonus',
          'status resistance',
          'tankiness',
        ];

        const durableNames = /(?:vanguard|crimson guard|pipe of insight|heart of tarrasque|shiva|eternal shroud|satanic|blade mail|octarine core|lotus orb|guardian greaves)/i;

        const isExcluded = /(?:recipe|blink dagger|rapier|desolator|dagon|bloodthorn)/i.test(
          item.dname,
        );

        const isDurableItem = item.attrib?.some((attr) => durableAttribs.includes(attr.key))
          || item.abilities?.some((ability) => durableAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || durableNames.test(item.dname);

        return isDurableItem && !isExcluded;
      },
    },
    {
      category: 'Escape',
      description:
        'Items that help heroes escape danger through invisibility, mobility, or status immunity.',
      condition: (item) => {
        const escapeAttribs = [
          'active_blink_range',
          'bonus_movement_speed',
          'phase_shift',
          'invisibility',
          'status_resistance',
        ];

        const escapeAbilities = [
          'blink',
          'invisibility',
          'dispel',
          'phase',
          'ghost',
          'evade',
          'escape',
          'untargetable',
        ];

        const escapeNames = /(?:blink dagger|force staff|glimmer cape|shadow blade|silver edge|eul|cyclone|ghost scepter|wind waker|lotus orb|boots of travel)/i;

        const isExcluded = /(?:recipe|rapier|battle fury|desolator|bloodthorn|guardian greaves)/i.test(
          item.dname,
        );

        const isEscapeItem = item.attrib?.some((attr) => escapeAttribs.includes(attr.key))
          || item.abilities?.some((ability) => escapeAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || escapeNames.test(item.dname);

        return isEscapeItem && !isExcluded;
      },
    },
    {
      category: 'Pusher',
      description:
        'Items that help heroes take towers, summon units, and apply map pressure.',
      condition: (item) => {
        const pusherAttribs = [
          'bonus_attack_speed',
          'aura_attack_speed',
          'aura_damage',
          'summon_unit',
          'bonus_building_damage',
        ];

        const pusherAbilities = [
          'summon',
          'siege',
          'building damage',
          'waveclear',
          'creep buff',
          'split push',
        ];

        const pusherNames = /(?:helm of the dominator|helm of the overlord|necronomicon|wraith pact|drum of endurance|assault cuirass|desolator|maelstrom|mjollnir|hand of midas)/i;

        const isExcluded = /(?:recipe|blink dagger|glimmer cape|ghost scepter|dagon|bloodthorn)/i.test(
          item.dname,
        );

        const isPusherItem = item.attrib?.some((attr) => pusherAttribs.includes(attr.key))
          || item.abilities?.some((ability) => pusherAbilities.some((keyword) => (ability.title || ability.description || '')
            .toLowerCase()
            .includes(keyword)))
          || pusherNames.test(item.dname);

        return isPusherItem && !isExcluded;
      },
    },
  ];

  const categorizedItems = [];
  rules.forEach((rule) => {
    const matchedItems = items.filter((item) => rule.condition(item));
    matchedItems.forEach((item) => {
      categorizedItems.push({
        ...item,
        beginnerCategory: {
          category: rule.category,
          description: rule.description,
        },
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

export default getBeginnerCategorizedItems;
