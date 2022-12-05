import { existsSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";

import { faker } from "@faker-js/faker";

import { writeSecretValue } from "./write-secret-value";

describe("writeSecretValue", () => {
  let outputPath: string;

  beforeEach(() => {
    const temporaryDirectory = `${process.cwd()}/tmp`;

    if (!existsSync(temporaryDirectory)) {
      mkdirSync(temporaryDirectory);
    }
    outputPath = `${temporaryDirectory}/${faker.system.fileName()}.json`;
  });

  afterEach(() => {
    unlinkSync(outputPath);
  });

  it("should write the secret value to the output path", () => {
    const secretValue = JSON.parse(faker.datatype.json());

    writeSecretValue(secretValue, outputPath);

    expect(readFileSync(outputPath, "utf8")).toEqual(
      JSON.stringify(secretValue),
    );
  });
});
