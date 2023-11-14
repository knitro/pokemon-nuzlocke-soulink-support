export interface PokeTypeInfo {
  type: PokeType;
  weak: PokeVulnerability[];
  resist: PokeVulnerability[];
  immune: PokeVulnerability[];
  colour: string; // Hex Colour that represents the type
  startingGeneration: number;
}

export enum PokeType {
  NORMAL = "normal",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
  ELECTRIC = "electric",
  ICE = "ice",
  FIGHTING = "fighting",
  POISON = "poison",
  GROUND = "ground",
  FLYING = "flying",
  PSYCHIC = "psychic",
  BUG = "bug",
  ROCK = "rock",
  GHOST = "ghost",
  DRAGON = "dragon",
  DARK = "dark",
  STEEL = "steel",
  FAIRY = "fairy",
}

export interface PokeVulnerability {
  earliestApplicableGeneration: number;
  types: PokeType[];
}
