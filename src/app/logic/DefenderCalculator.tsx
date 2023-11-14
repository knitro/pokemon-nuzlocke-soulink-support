import { getPokeTypeInfo } from "@/app/data/TypeData";
import { PokeType, PokeVulnerability } from "@/app/data/TypeDataInterface";
import { PokemonPastType, PokemonType } from "pokenode-ts";
import { PokeDefense } from "../components/PokeApiCard/PokeApiInterfaces";

export default function getDefending(
  types: PokeType[],
  generation: number
): PokeDefense {
  let weakness: PokeType[] = [];
  let resistance: PokeType[] = [];
  let immunity: PokeType[] = [];

  types.forEach((value: PokeType) => {
    const pokeTypeInfo = getPokeTypeInfo(value);
    if (pokeTypeInfo) {
      weakness = weakness.concat(
        getRelevantTypes(pokeTypeInfo.weak, generation)
      );
      resistance = resistance.concat(
        getRelevantTypes(pokeTypeInfo.resist, generation)
      );
      immunity = immunity.concat(
        getRelevantTypes(pokeTypeInfo.immune, generation)
      );
    }
  });

  // Remove weakness and resistance if in immunity
  immunity.forEach((immuneType: PokeType) => {
    weakness = weakness.filter(
      (currentType: PokeType) => currentType !== immuneType
    );
    resistance = resistance.filter(
      (currentType: PokeType) => currentType !== immuneType
    );
  });

  // Remove from Weakness and Resistance if in both
  let updatedWeakness: PokeType[] = weakness.filter(
    (weaknessType: PokeType) => !resistance.includes(weaknessType)
  );
  let updatedResistance: PokeType[] = resistance.filter(
    (resistanceType: PokeType) => !weakness.includes(resistanceType)
  );

  weakness = updatedWeakness;
  resistance = updatedResistance;

  // Add duplicates to the double Weakness and Resist arrays.
  // Using O(N^2) function as size of these arrays is always small and uses less memory
  let doubleWeak: PokeType[] = weakness.filter(
    (item, index) => weakness.indexOf(item) !== index
  );
  let doubleResist: PokeType[] = resistance.filter(
    (item, index) => resistance.indexOf(item) !== index
  );

  weakness = weakness.filter(
    (weakType: PokeType) => !doubleWeak.includes(weakType)
  );
  resistance = resistance.filter(
    (resistType: PokeType) => !doubleResist.includes(resistType)
  );

  const returnValue: PokeDefense = {
    defense0: immunity,
    defense25: doubleResist,
    defense50: resistance,
    defense200: weakness,
    defense400: doubleWeak,
  };
  return returnValue;
}

export function getTypeBasedOnGeneration(
  types: PokemonType[],
  pastTypes: PokemonPastType[],
  generation: number
): PokeType[] {
  if (pastTypes == null || pastTypes.length == 0) {
    // There are no changes in type in this pokemon.
    return extractPokeTypes(types);
  }

  let returnValue: PokeType[] = [];
  let returnGeneration = 0;
  pastTypes.forEach((pokemonPastType: PokemonPastType) => {
    const generationNumber = generationStringToGenerationNumber(
      pokemonPastType.generation.name
    );
    if (
      (generation >= generationNumber || returnGeneration === 0) &&
      generationNumber > returnGeneration
    ) {
      returnValue = extractPokeTypes(pokemonPastType.types);
      returnGeneration = generationNumber;
    }
  });

  // types Generation will be the highest returnGeneration + 1
  if (returnGeneration + 1 <= generation) {
    return extractPokeTypes(types);
  }
  return returnValue;
}

function extractPokeTypes(typesToExtract: PokemonType[]): PokeType[] {
  const returnArray: PokeType[] = [];
  typesToExtract.forEach((value: PokemonType) => {
    const typeString = value.type.name;
    const pokeType = typeString as PokeType;
    returnArray.push(pokeType);
  });

  return returnArray;
}

function generationStringToGenerationNumber(generationString: string): number {
  // Input in the form of "generation-i" etc.
  const cleanedString = generationString.replace("generation-", "");
  switch (cleanedString) {
    case "i":
      return 1;
    case "ii":
      return 2;
    case "iii":
      return 3;
    case "iv":
      return 4;
    case "v":
      return 5;
    case "vi":
      return 6;
    case "vii":
      return 7;
    case "viii":
      return 8;
    case "ix":
      return 9;
    default:
      return 9;
  }
}

function getRelevantTypes(
  typesToFilter: PokeVulnerability[],
  generation: number
): PokeType[] {
  const earliestApplicationGenerations = typesToFilter.map(
    (value: PokeVulnerability) => value.earliestApplicableGeneration
  );

  let relevantGeneration = 0;
  for (let i = 0; i < earliestApplicationGenerations.length; i++) {
    const currentEarliestGeneration = earliestApplicationGenerations[i];
    if (
      currentEarliestGeneration > relevantGeneration &&
      currentEarliestGeneration <= generation
    ) {
      relevantGeneration = currentEarliestGeneration;
    }
  }

  let returnValue: PokeType[] = [];
  typesToFilter.forEach((pokeVulnerability: PokeVulnerability) => {
    if (pokeVulnerability.earliestApplicableGeneration === relevantGeneration) {
      returnValue = pokeVulnerability.types;
    }
  });

  return returnValue;
}
