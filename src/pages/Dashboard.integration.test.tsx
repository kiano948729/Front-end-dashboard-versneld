import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
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

describe("Dashboard integration", () => {
  test("renders characters after API call", async () => {
    (api.get as any).mockResolvedValue(mockData);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Aragorn")).toBeInTheDocument();
    });
  });

  test("shows error when API fails", async () => {
    (api.get as any).mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load characters/i)
      ).toBeInTheDocument();
    });
  });
});