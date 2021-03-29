import * as scryfall from "@/services/scryfall.js";

describe("Scryfall - service", () => {
  it("points to correct api url", () => {
    expect(scryfall.instance.defaults.baseURL).toBe("https://api.scryfall.com");
  });

  it("scryFallRandomCard method exists", () => {
    expect(scryfall.scryFallRandomCard).toBeDefined();
  });

  it("scryFallSearchCard method exists", () => {
    expect(scryfall.scryFallSearchCard).toBeDefined();
  });

  it("scryFallAutoComplete method exists", () => {
    expect(scryfall.scryFallAutoComplete).toBeDefined();
  });
});
