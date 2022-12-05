import * as core from "@actions/core";
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import { getInput } from "./get-input";

describe("getInput", () => {
  it("should return the value of the input if it is provided", () => {
    const input = faker.random.alphaNumeric(10);
    jest.spyOn(core, "getInput").mockReturnValueOnce(input);

    expect(getInput("AWS_ACCESS_KEY_ID")).toEqual(input);
  });

  it("should return the value of the environment variable if the input is not provided", () => {
    const environment = faker.random.alphaNumeric(10);
    jest.spyOn(core, "getInput").mockReturnValueOnce("");
    process.env.AWS_ACCESS_KEY_ID = environment;

    expect(getInput("AWS_ACCESS_KEY_ID")).toEqual(environment);
  });

  it("should return an empty string if the input and environment variable are not provided", () => {
    jest.spyOn(core, "getInput").mockReturnValueOnce("");
    delete process.env.AWS_ACCESS_KEY_ID;

    expect(getInput("AWS_ACCESS_KEY_ID")).toEqual("");
  });
});
