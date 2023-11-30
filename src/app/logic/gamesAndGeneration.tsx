export function getGenerationFromGames(game: string): number {
  switch (game) {
    case "red-blue":
    case "yellow":
      return 1;
    case "gold-silver":
    case "crystal":
      return 2;
    case "ruby-sapphire":
    case "emerald":
    case "firered-leafgreen":
    case "colosseum":
    case "xd":
      return 3;
    case "diamond-pearl":
    case "platinum":
    case "heartgold-soulsilver":
      return 4;
    case "black-white":
    case "black-2-white-2":
      return 5;
    case "x-y":
    case "omega-ruby-alpha-sapphire":
      return 6;
    case "sun-moon":
    case "ultra-sun-ultra-moon":
    case "lets-go-pikachu-lets-go-eevee":
      return 7;
    case "sword-shield":
    case "brilliant-diamond-and-shining-pearl":
      return 8;
    case "scarlet-violet":
      return 9;
    default:
      return 9; // Default to Latest Generation ==> 9
  }
}
