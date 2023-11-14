export interface PokeTypeInfo {
  type: PokeType;
  weak: PokeVulnerability[];
  resist: PokeVulnerability[];
  immune: PokeVulnerability[];
  colour: string; // Hex Colour that represents the type
  startingGeneration: number;
}

export enum PokeType {
  NORMAL = "Normal",
  FIRE = "Fire",
  WATER = "Water",
  GRASS = "Grass",
  ELECTRIC = "Electric",
  ICE = "Ice",
  FIGHTING = "Fighting",
  POISON = "Poison",
  GROUND = "Ground",
  FLYING = "Flying",
  PSYCHIC = "Psychic",
  BUG = "Bug",
  ROCK = "Rock",
  GHOST = "Ghost",
  DRAGON = "Dragon",
  DARK = "Dark",
  STEEL = "Steel",
  FAIRY = "Fairy",
}

export interface PokeVulnerability {
  earliestApplicableGeneration: number;
  types: PokeType[];
}
