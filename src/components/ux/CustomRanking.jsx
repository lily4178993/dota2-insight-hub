import React from 'react';
import {
  IconBattleGear,
  IconNotebook,
  IconMultiTarget,
  IconPuzzle,
  IconStar,
  IconTrophy2,
} from '../../assets';
import ItemCard2 from '../Card/ItemCard2';

function CustomRanking() {
  const rankingCriteria = [
    {
      icon: IconMultiTarget,
      title: 'Strategic Complexity',
      description:
        'Evaluates the depth of decision-making, learning curve, and modular logic required to master the item or hero.',
    },
    {
      icon: IconTrophy2,
      title: 'Meta Impact',
      description:
        'Measures influence across game phases, synergy with current strategies, and relevance in competitive compositions.',
    },
    {
      icon: IconBattleGear,
      title: 'Beginner Accessibility',
      description:
        'Rates how intuitive and forgiving the item or hero is for new players, including tooltip clarity and role transparency.',
    },
  ];

  const methodologyCriteria = [
    {
      title: 'Data Sources',
      description: [
        'Official Dota 2 API',
        'Replay parsing and pattern analysis',
        'Informal community insights and fan observations',
      ],
    },
    {
      title: 'Filtering Logic',
      description: [
        'Custom-built multi-criteria algorithm',
        'Adaptive weighting based on meta shifts',
        'Iterative refinement through solo testing',
      ],
    },
    {
      title: 'Project Scope',
      description: [
        'Independent fan initiative with no official affiliation',
        'No involvement from professional players or teams',
        'Built to explore clarity, accessibility, and strategic depth',
      ],
    },
  ];

  return (
    <>
      <div className="mb-16 text-center">
        <div className="p-4 md:p-8">
          <h2 className="flex items-center justify-center gap-3 text-3xl lg:text-4xl lg:items-end">
            <img
              src={IconPuzzle}
              alt="DagCore Ranking System"
              className="inline object-cover p-1 size-12"
            />
            DagCore Ranking System
          </h2>
        </div>
        <p className="max-w-3xl mx-auto text-sm leading-relaxed text-gray-400 lg:text-base">
          Our unique approach to evaluating heroes goes beyond traditional
          statistics to analyze the true strategic impact within the Dota
          ecosystem. It’s a passionate reading of the game, crafted for fans who
          love to dig deeper.
        </p>
      </div>

      <div className="relative grid gap-8 mx-auto justify-center md:grid-cols-3 max-w-[90vw] mb-16 box-wavy-bottom">
        {rankingCriteria.map((criteria) => (
          <ItemCard2
            key={criteria.title}
            imageSrc={criteria.icon}
            title={criteria.title}
            description={criteria.description}
          />
        ))}
        <svg className="absolute">
          <filter id="wavy">
            <feTurbulence
              x="0"
              y="0"
              baseFrequency="0.02"
              numOctaves="5"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="30"
            />
          </filter>
        </svg>
      </div>

      {/* Preview Classification */}
      <div className="grid gap-8 mb-12 lg:grid-cols-2">
        {/* Item Categories */}
        <div className="border rounded-3xl ">
          <div className="p-4 md:p-8">
            <h3 className="flex items-center gap-3 mb-4 text-3xl lg:items-end">
              <img
                src={IconStar}
                alt=""
                className="inline object-cover p-1 size-12"
              />
              Classification Preview
            </h3>
          </div>
          <div>
            {/* Add clouds like screenshots to preview 1. heroes & 2. items
                in their boxes from heroes/items page */}
            {/* Add a link here to redirect to the specific page */}
          </div>
        </div>

        {/* Methodology */}
        <div className="border rounded-3xl">
          <div className="p-4 md:p-8">
            <h3 className="flex items-center gap-3 mb-4 text-3xl lg:items-end">
              <img
                src={IconNotebook}
                alt="dagcore methodology"
                className="inline object-cover p-1 size-12"
              />
              Methodology
            </h3>

            <div className="pl-8 space-y-4 text-gray-300">
              {methodologyCriteria.map((criteria) => (
                <div
                  key={criteria.title}
                  className="space-y-2"
                >
                  <h4 className="text-lg text-gray-300">{criteria.title}</h4>
                  <ul>
                    {criteria.description.map((desc, index) => (
                      <li
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className="text-sm text-gray-400 list-disc"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomRanking;
