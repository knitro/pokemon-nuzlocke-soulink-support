export function capitalise(input: string): string {
  let inputWithSpaces = input.replace("-", " ");
  let words = inputWithSpaces.split(" ");
  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
}
