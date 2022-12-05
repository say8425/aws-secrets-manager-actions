import { validateRegion } from "./validate-region";

describe("validateRegion", () => {
  it("should throw an error if no region is provided", () => {
    const region = "";

    expect(() => validateRegion(region)).toThrow("AWS_REGION is required");
  });

  it("should return true if a region is provided", () => {
    const region = "ap-northeast-2";

    expect(validateRegion(region)).toBeTruthy();
  });
});
