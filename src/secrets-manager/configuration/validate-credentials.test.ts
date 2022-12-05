import { Credentials } from "@aws-sdk/types";
import { faker } from "@faker-js/faker";

import { validateCredentials } from "./validate-credentials";

describe("validateCredentials", () => {
  it("should throw an error if no credentials are provided", () => {
    const credentials = {};

    expect(() => validateCredentials(credentials as Credentials)).toThrow(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or AWS_SESSION_TOKEN is required",
    );
  });

  it("should throw an error if only accessKeyId is provided", () => {
    const credentials = {
      accessKeyId: faker.random.alphaNumeric(10),
    };

    expect(() => validateCredentials(credentials as Credentials)).toThrow(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required",
    );
  });

  it("should throw an error if only secretAccessKey is provided", () => {
    const credentials = {
      secretAccessKey: faker.random.alphaNumeric(10),
    };

    expect(() => validateCredentials(credentials as Credentials)).toThrow(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required",
    );
  });

  it("should return true if accessKeyId and secretAccessKey are provided", () => {
    const credentials = {
      accessKeyId: faker.random.alphaNumeric(10),
      secretAccessKey: faker.random.alphaNumeric(10),
    };

    expect(validateCredentials(credentials as Credentials)).toBeTruthy();
  });

  it("should return true if only sessionToken is provided", () => {
    const credentials = {
      sessionToken: faker.random.alphaNumeric(10),
    };

    expect(() => validateCredentials(credentials as Credentials)).toBeTruthy();
  });

  it("should return true if all credentials are provided", () => {
    const credentials = {
      accessKeyId: faker.random.alphaNumeric(10),
      secretAccessKey: faker.random.alphaNumeric(10),
      sessionToken: faker.random.alphaNumeric(10),
    };

    expect(validateCredentials(credentials as Credentials)).toBeTruthy();
  });
});
