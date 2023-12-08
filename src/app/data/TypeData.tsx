import { PokeType, PokeTypeInfo } from "./TypeDataInterface";

export const getPokeTypeInfo = (type: PokeType): PokeTypeInfo | null => {
  const pokeTypeInfo = pokeTypeData.find(
    (value: PokeTypeInfo) => value.type === type
  );
  return pokeTypeInfo === undefined ? null : pokeTypeInfo;
};

export const getPokeTypeData = () => {
  return [...pokeTypeData];
};

const pokeTypeData: PokeTypeInfo[] = [
  {
    type: PokeType.NORMAL,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING],
      },
    ],
    resist: [],
    immune: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GHOST],
      },
    ],
    colour: "#A8A878",
    startingGeneration: 1,
  },

  {
    type: PokeType.FIGHTING,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FLYING, PokeType.PSYCHIC],
      },
      {
        earliestApplicableGeneration: 6,
        types: [PokeType.FLYING, PokeType.PSYCHIC, PokeType.FAIRY],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.ROCK, PokeType.BUG],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.ROCK, PokeType.BUG, PokeType.DARK],
      },
    ],
    immune: [],
    colour: "#C03028",
    startingGeneration: 1,
  },

  {
    type: PokeType.FLYING,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.ROCK, PokeType.ELECTRIC, PokeType.ICE],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING, PokeType.BUG, PokeType.GRASS],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GROUND],
      },
    ],
    colour: "#A890F0",
    startingGeneration: 1,
  },

  {
    type: PokeType.POISON,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GROUND, PokeType.BUG, PokeType.PSYCHIC],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.GROUND, PokeType.PSYCHIC],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING, PokeType.POISON, PokeType.GRASS],
      },
      {
        earliestApplicableGeneration: 2,
        types: [
          PokeType.FIGHTING,
          PokeType.POISON,
          PokeType.GRASS,
          PokeType.BUG,
        ],
      },
    ],
    immune: [],
    colour: "#A040A0",
    startingGeneration: 1,
  },

  {
    type: PokeType.GROUND,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.WATER, PokeType.GRASS, PokeType.ICE],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.POISON, PokeType.ROCK],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.ELECTRIC],
      },
    ],
    colour: "#E0C068",
    startingGeneration: 1,
  },

  {
    type: PokeType.ROCK,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [
          PokeType.FIGHTING,
          PokeType.GROUND,
          PokeType.WATER,
          PokeType.GRASS,
        ],
      },
      {
        earliestApplicableGeneration: 2,
        types: [
          PokeType.FIGHTING,
          PokeType.GROUND,
          PokeType.STEEL,
          PokeType.WATER,
          PokeType.GRASS,
        ],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [
          PokeType.NORMAL,
          PokeType.FLYING,
          PokeType.POISON,
          PokeType.FIRE,
        ],
      },
    ],
    immune: [],
    colour: "#B8A038",
    startingGeneration: 1,
  },

  {
    type: PokeType.BUG,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FLYING, PokeType.POISON, PokeType.ROCK, PokeType.FIRE],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.FLYING, PokeType.ROCK, PokeType.FIRE],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING, PokeType.GROUND, PokeType.GRASS],
      },
    ],
    immune: [],
    colour: "#A8B820",
    startingGeneration: 1,
  },

  {
    type: PokeType.GHOST,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GHOST],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.GHOST, PokeType.DARK],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.POISON, PokeType.BUG],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.NORMAL, PokeType.FIGHTING],
      },
    ],
    colour: "#705898",
    startingGeneration: 1,
  },

  {
    type: PokeType.STEEL,
    weak: [
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.FIGHTING, PokeType.GROUND, PokeType.FIRE],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 2,
        types: [
          PokeType.NORMAL,
          PokeType.FLYING,
          PokeType.ROCK,
          PokeType.BUG,
          PokeType.GHOST,
          PokeType.STEEL,
          PokeType.GRASS,
          PokeType.PSYCHIC,
          PokeType.ICE,
          PokeType.DRAGON,
          PokeType.DARK,
        ],
      },
      {
        earliestApplicableGeneration: 6,
        types: [
          PokeType.NORMAL,
          PokeType.FLYING,
          PokeType.ROCK,
          PokeType.BUG,
          PokeType.STEEL,
          PokeType.GRASS,
          PokeType.PSYCHIC,
          PokeType.ICE,
          PokeType.DRAGON,
          PokeType.FAIRY,
        ],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.POISON],
      },
    ],
    colour: "#B8B8D0",
    startingGeneration: 2,
  },

  {
    type: PokeType.FIRE,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GROUND, PokeType.ROCK, PokeType.WATER],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.BUG, PokeType.FIRE, PokeType.GRASS],
      },
      {
        earliestApplicableGeneration: 2,
        types: [
          PokeType.BUG,
          PokeType.STEEL,
          PokeType.FIRE,
          PokeType.GRASS,
          PokeType.ICE,
        ],
      },
    ],
    immune: [],
    colour: "#F08030",
    startingGeneration: 1,
  },

  {
    type: PokeType.WATER,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GRASS, PokeType.ELECTRIC],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.STEEL, PokeType.FIRE, PokeType.WATER, PokeType.ICE],
      },
    ],
    immune: [],
    colour: "#6890F0",
    startingGeneration: 1,
  },

  {
    type: PokeType.GRASS,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [
          PokeType.FLYING,
          PokeType.POISON,
          PokeType.BUG,
          PokeType.FIRE,
          PokeType.ICE,
        ],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [
          PokeType.GROUND,
          PokeType.WATER,
          PokeType.GRASS,
          PokeType.ELECTRIC,
        ],
      },
    ],
    immune: [],
    colour: "#78C850",
    startingGeneration: 1,
  },

  {
    type: PokeType.ELECTRIC,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GROUND],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FLYING, PokeType.ELECTRIC],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.FLYING, PokeType.STEEL, PokeType.ELECTRIC],
      },
    ],
    immune: [],
    colour: "#F8D030",
    startingGeneration: 1,
  },

  {
    type: PokeType.PSYCHIC,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.BUG],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.BUG, PokeType.GHOST, PokeType.DARK],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING, PokeType.PSYCHIC],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.GHOST],
      },
      {
        earliestApplicableGeneration: 2,
        types: [],
      },
    ],
    colour: "#F85888",
    startingGeneration: 1,
  },

  {
    type: PokeType.ICE,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.FIGHTING, PokeType.ROCK, PokeType.FIRE],
      },
      {
        earliestApplicableGeneration: 2,
        types: [
          PokeType.FIGHTING,
          PokeType.ROCK,
          PokeType.STEEL,
          PokeType.FIRE,
        ],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.ICE],
      },
    ],
    immune: [],
    colour: "#98D8D8",
    startingGeneration: 1,
  },

  {
    type: PokeType.DRAGON,
    weak: [
      {
        earliestApplicableGeneration: 1,
        types: [PokeType.ICE, PokeType.DRAGON],
      },
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.ICE, PokeType.DRAGON, PokeType.FAIRY],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 1,
        types: [
          PokeType.FIRE,
          PokeType.WATER,
          PokeType.GRASS,
          PokeType.ELECTRIC,
        ],
      },
    ],
    immune: [],
    colour: "#7038F8",
    startingGeneration: 1,
  },

  {
    type: PokeType.DARK,
    weak: [
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.FIGHTING, PokeType.BUG],
      },
      {
        earliestApplicableGeneration: 6,
        types: [PokeType.FIGHTING, PokeType.BUG, PokeType.FAIRY],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.GHOST, PokeType.DARK],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 2,
        types: [PokeType.PSYCHIC],
      },
    ],
    colour: "#705848",
    startingGeneration: 2,
  },

  {
    type: PokeType.FAIRY,
    weak: [
      {
        earliestApplicableGeneration: 6,
        types: [PokeType.POISON, PokeType.STEEL],
      },
    ],
    resist: [
      {
        earliestApplicableGeneration: 6,
        types: [PokeType.FIGHTING, PokeType.BUG, PokeType.DARK],
      },
    ],
    immune: [
      {
        earliestApplicableGeneration: 6,
        types: [PokeType.DRAGON],
      },
    ],
    colour: "#EE99AC",
    startingGeneration: 6,
  },
];
