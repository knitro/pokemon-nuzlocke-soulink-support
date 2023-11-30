import { PokeType } from "@/app/data/TypeDataInterface";

export interface PokeApiDisplayInformation {
  name: string;
  defaultImageUrl: string | null;
  femaleImageUrl: string | null;
  types: PokeType[];
  defense: PokeDefense;
  evolutionChain: PokeEvolutionChainSingle[];
  stats: PokeStat[];
  levelMoves: PokeMove[];
}

export interface PokeDefense {
  defense0: PokeType[]; // Takes 0% damage from these types
  defense25: PokeType[]; // Takes 25% damage from these types
  defense50: PokeType[]; // Takes 50% damage from these types
  defense200: PokeType[]; // Takes 200% damage from these types
  defense400: PokeType[]; // Takes 400% damage from these types
}

export interface PokeEvolutionChainSingle {
  name: string;
  imageUrl: string;
  condition: string;
  previousEvoName: string;
}

export interface PokeStat {
  name: string;
  value: number;
  ev?: number;
}

export interface PokeMove {
  name: string;
  level: number;
}
