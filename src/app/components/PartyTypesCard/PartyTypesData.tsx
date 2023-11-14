import { getPokeTypeData } from "@/app/data/TypeData";
import { PokeTypeInfo } from "@/app/data/TypeDataInterface";

export function getTypeArray(generation: number) {
  const typeData = getPokeTypeData();
  const returnArray = typeData.filter((value: PokeTypeInfo) => {
    if (generation >= value.startingGeneration) {
      return true;
    }
    return false;
  });

  return returnArray;
}
