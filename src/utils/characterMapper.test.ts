/// <reference types="vitest" />
import { describe, test, expect } from "vitest";
import {
  mapApiCharacterToCharacter,
  mapApiCharactersToCharacters,
} from "./characterMapper";

describe("Character Mapper", () => {
  const mockApiCharacter = {
    _id: "1",
    name: "Aragorn",
    race: "Human",
    gender: "Male",
    birth: "2931",
    death: "",
    realm: "Gondor",
    spouse: "Arwen",
    wikiUrl: "https://lotr.fandom.com/wiki/Aragorn",
  };

  test("maps ApiCharacter to Character correctly", () => {
    const result = mapApiCharacterToCharacter(mockApiCharacter);

    expect(result._id).toBe("1");
    expect(result.name).toBe("Aragorn");
    expect(result.race).toBe("Human");
    expect(result.isFavorite).toBe(false);

    // Random values check
    expect(result.powerLevel).toBeGreaterThanOrEqual(5000);
    expect(result.powerLevel).toBeLessThanOrEqual(15000);

    expect(result.powerChange).toBeGreaterThanOrEqual(-5);
    expect(result.powerChange).toBeLessThanOrEqual(5);
  });

  test("handles missing values with defaults", () => {
    const incomplete = {
      _id: "2",
      name: "",
      race: "",
      gender: "",
      birth: "",
      death: "",
      realm: "",
      spouse: "",
      wikiUrl: "",
    };

    const result = mapApiCharacterToCharacter(incomplete);

    expect(result.name).toBe("Unknown");
    expect(result.race).toBe("Unknown");
    expect(result.spouse).toBe("None");
  });

  test("maps multiple characters", () => {
    const result = mapApiCharactersToCharacters([mockApiCharacter]);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Aragorn");
  });
});