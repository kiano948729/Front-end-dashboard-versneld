/// <reference types="cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");

    // Wacht tot characters geladen zijn door op een character naam te checken
    cy.get("h3.text-xl.font-bold.text-white", { timeout: 10000 }).should("exist");
  });

  it("loads the dashboard", () => {
    cy.contains("Character Assets").should("exist");
  });

  it("search works", () => {
    cy.get('input[placeholder="Search character..."]', { timeout: 10000 })
      .should("exist")
      .type("Aragorn");

    cy.contains("Aragorn", { timeout: 10000 }).should("exist");
  });

  it("resets results when search is cleared", () => {
    cy.get('input[placeholder="Search character..."]')
      .type("the great geralt of rivia");

    cy.contains("No characters found").should("exist");

    // clear search
    cy.get('input[placeholder="Search character..."]').clear();

    // characters moeten weer terugkomen
    cy.get("h3.text-xl.font-bold.text-white").should("exist");
  });

  it("filter works", () => {
    cy.get("select", { timeout: 10000 }).should("exist").select("Human");

    cy.get("span").contains("Human").should("exist");
  });

  it("can toggle favorite", () => {
    // Klik de eerste ster button op AssetCard
    cy.get("div.relative button.absolute.top-4.right-4").first().click();

    cy.get("div.relative button.absolute.top-4.right-4")
      .first()
      .find("svg")
      .should("have.class", "fill-[#D4AF37]");
  });

    it("combines search and filter", () => {
    cy.get('input[placeholder="Search character..."]')
      .clear()
      .type("a");

    cy.get("select").select("Elf");

    // Alleen Elf + naam met "a" moet zichtbaar zijn (bijv Legolas)
    cy.contains("Legolas").should("exist");

    // Aragorn (Human) moet niet zichtbaar zijn
    cy.contains("Aragorn").should("not.exist");
  });
});