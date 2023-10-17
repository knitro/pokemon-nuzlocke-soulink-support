const data = {
  // Game: Gyms 1-8, Elite 4 [1-4], Champion
  red: [14, 21, 24, 29, 43, 43, 47, 50, 56, 58, 60, 62, 65], // Same as Red
  blue: [14, 21, 24, 29, 43, 43, 47, 50, 56, 58, 60, 62, 65], // Same as Blue
  yellow: [12, 21, 28, 32, 50, 50, 54, 55, 56, 58, 60, 62, 65],
  gold: [9, 16, 20, 25, 30, 35, 31, 40, 42, 44, 46, 47, 50], // Same as Silver
  silver: [9, 16, 20, 25, 30, 35, 31, 40, 42, 44, 46, 47, 50], // Same as Gold
  crystal: [9, 15, 20, 25, 30, 35, 31, 40, 42, 44, 46, 47, 50],
  ruby: [15, 18, 23, 28, 31, 34, 42, 43, 49, 51, 53, 55, 58], // Same as Sapphire
  sapphire: [15, 18, 23, 28, 31, 34, 42, 43, 49, 51, 53, 55, 58], // Same as Ruby
  emerald: [15, 19, 24, 29, 31, 33, 42, 46, 49, 51, 53, 55, 58],
  fireRed: [14, 21, 24, 29, 43, 43, 47, 50, 54, 56, 58, 60, 63], // Same as Leaf Green
  leafGreen: [14, 21, 24, 29, 43, 43, 47, 50, 54, 56, 58, 60, 63], // Same as Fire Red
  diamond: [14, 22, 30, 30, 36, 39, 42, 49, 57, 59, 61, 63, 66], // Same as Pearl
  pearl: [14, 22, 30, 30, 36, 39, 42, 49, 57, 59, 61, 63, 66], // Same as Diamond
  platinum: [14, 22, 26, 32, 37, 41, 44, 50, 53, 55, 57, 59, 62],
  heartGold: [13, 17, 19, 25, 31, 35, 34, 41, 42, 44, 46, 47, 50], //Same as Soul Silver
  soulSilver: [13, 17, 19, 25, 31, 35, 34, 41, 42, 44, 46, 47, 50], //Same as Heart Gold
};

export function getLevelCapData(gameName: string) {
  switch (gameName) {
    case "red":
      return data.red;
    case "blue":
      return data.blue;
    case "yellow":
      return data.yellow;
    case "gold":
      return data.gold;
    case "silver":
      return data.silver;
    case "crystal":
      return data.crystal;
    case "ruby":
      return data.ruby;
    case "sapphire":
      return data.sapphire;
    case "emerald":
      return data.emerald;
    case "fireRed":
      return data.fireRed;
    case "leafGreen":
      return data.leafGreen;
    case "diamond":
      return data.diamond;
    case "pearl":
      return data.pearl;
    case "platinum":
      return data.platinum;
    case "heartGold":
      return data.heartGold;
    case "soulSilver":
      return data.soulSilver;
    default:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}
