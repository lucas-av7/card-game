import { instance } from "@/services/scryfall.js";

describe("Scryfall - service", () => {
  it("points to correct api url", () => {
    expect(instance.defaults.baseURL).toBe("https://api.scryfall.com");
  });
});
