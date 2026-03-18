/// <reference types="vitest" />
import { describe, test, expect } from "vitest";
import { getUniqueRaces, getRaceDistribution } from "./Dashboard";

const mockCharacters = [
  { race: "Human" },
  { race: "Elf" },
  { race: "Human" },
];

describe("Dashboard utils", () => {
  test("getUniqueRaces returns unique races", () => {
    const result = getUniqueRaces(mockCharacters as any);

    expect(result).toContain("Human");
    expect(result).toContain("Elf");
    expect(result.length).toBe(2);
  });

  test("getRaceDistribution counts correctly", () => {
    const result = getRaceDistribution(mockCharacters as any);

    expect(result).toEqual(
      expect.arrayContaining([
        { name: "Human", value: 2 },
        { name: "Elf", value: 1 },
      ])
    );
  });
});