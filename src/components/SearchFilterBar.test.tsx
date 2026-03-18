/// <reference types="vitest" />
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilterBar from "./SearchFilterBar";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("SearchFilterBar component", () => {
  const mockOnSearchChange = vi.fn();
  const mockOnRaceChange = vi.fn();
  const races = ["Human", "Elf", "Orc"];

  beforeEach(() => {
    mockOnSearchChange.mockClear();
    mockOnRaceChange.mockClear();
  });

  test("renders search input and select dropdown", () => {
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        selectedRace=""
        onRaceChange={mockOnRaceChange}
        races={races}
      />,
    );

    const input = screen.getByPlaceholderText(/search character/i);
    const select = screen.getByRole("combobox");

    expect(input).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test("renders all race options", () => {
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        selectedRace=""
        onRaceChange={mockOnRaceChange}
        races={races}
      />,
    );

    expect(
      screen.getByRole("option", { name: "All Races" }),
    ).toBeInTheDocument();

    races.forEach((race) => {
      expect(screen.getByRole("option", { name: race })).toBeInTheDocument();
    });
  });

  test("calls onSearchChange when typing in search input", () => {
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        selectedRace=""
        onRaceChange={mockOnRaceChange}
        races={races}
      />,
    );

    const input = screen.getByPlaceholderText(/search character/i);
    fireEvent.change(input, { target: { value: "Aragorn" } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith("Aragorn");
  });

  test("calls onRaceChange when selecting a race", () => {
    render(
      <SearchFilterBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        selectedRace=""
        onRaceChange={mockOnRaceChange}
        races={races}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Elf" } });

    expect(mockOnRaceChange).toHaveBeenCalledTimes(1);
    expect(mockOnRaceChange).toHaveBeenCalledWith("Elf");
  });
});
