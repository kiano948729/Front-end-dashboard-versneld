/// <reference types="vitest" />
import { describe, test, expect, vi } from "vitest";
import axios from "axios";
import { api } from "./api";

describe("API instance", () => {
  test("should have correct baseURL", () => {
    expect(api.defaults.baseURL).toBe("https://the-one-api.dev/v2");
  });

  test("should include Authorization header", () => {
    expect(api.defaults.headers.Authorization).toContain("Bearer");
  });
});