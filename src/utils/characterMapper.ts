import type { ApiCharacter, Character } from "../types/character";

export function mapApiCharacterToCharacter(apiChar: ApiCharacter): Character {
  return {
    _id: apiChar._id,
    name: apiChar.name || "Unknown",
    race: apiChar.race || "Unknown",
    gender: apiChar.gender || "Unknown",
    birth: apiChar.birth || "Unknown",
    death: apiChar.death || "Unknown",
    realm: apiChar.realm || "Unknown",
    spouse: apiChar.spouse || "None",
    wikiUrl: apiChar.wikiUrl || "",
    powerLevel: Math.floor(Math.random() * 10000) + 5000,
    powerChange: Math.random() * 10 - 5,
    isFavorite: false,
  };
}

export function mapApiCharactersToCharacters(apiChars: ApiCharacter[]): Character[] {
  return apiChars.map(mapApiCharacterToCharacter);
}