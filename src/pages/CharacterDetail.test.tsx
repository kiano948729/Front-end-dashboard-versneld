/// <reference types="vitest" />
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import CharacterDetail from "./CharacterDetail";
import { MemoryRouter, Route, Routes } from "react-router";
import { api } from "../api/api";

vi.mock("../api/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockData = {
  data: {
    docs: [
      {
        _id: "1",
        name: "Aragorn",
        race: "Human",
        gender: "Male",
        birth: "",
        death: "",
        realm: "",
        spouse: "",
        wikiUrl: "",
      },
    ],
  },
};

describe("CharacterDetail", () => {
  test("renders character details", async () => {
    (api.get as any).mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Aragorn")).toBeInTheDocument();
    });
  });

  test("shows error when not found", async () => {
    (api.get as any).mockResolvedValue({ data: { docs: [] } });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/character not found/i)
      ).toBeInTheDocument();
    });
  });
});