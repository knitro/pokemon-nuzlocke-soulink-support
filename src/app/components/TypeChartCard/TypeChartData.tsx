const typeChartGenOne = "https://nchencs.neocities.org/gen1typechart.png";
const typeChartGenTwo = "https://nchencs.neocities.org/gen2-5typechart.png";
const typeChartGenSix = "https://nchencs.neocities.org/gen6-7typechart.png";

export function getTypeChartUrl(generation: number) {
  if (generation < 2) {
    return typeChartGenOne;
  } else if (generation < 6) {
    return typeChartGenTwo;
  } else {
    return typeChartGenSix;
  }
}
