import { ResourceNotFoundException } from "@aws-sdk/client-secrets-manager";
import { faker } from "@faker-js/faker";

import { client } from "../configuration";
import { getSecretValueCommand } from "./get-secret-value.command";

describe("getSecretValueCommand", () => {
  const secretsManagerClient = client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_DEFAULT_REGION,
  });

  describe("when the secret exists", () => {
    it("should return the secret value as JSON", async () => {
      const secretName = "AdeliePenguin";
      const result = await getSecretValueCommand(
        secretsManagerClient,
        secretName,
      );

      expect(result).toEqual({
        SCIENTIFIC_NAME: "Pygoscelis adeliae",
        MIN_HEIGHT: 46,
        MAX_HEIGHT: 71,
        MIN_WEIGHT: 3.6,
        MAX_WEIGHT: 6,
        SWIMMING_SPEED: 8,
        LEAPING_METERS: 3,
      });
    });
  });

  describe("when the secret is empty", () => {
    it("should return empty json", async () => {
      const secretName = "AdeliePenguin-empty";
      const result = await getSecretValueCommand(
        secretsManagerClient,
        secretName,
      );

      expect(result).toEqual({});
    });
  });

  describe("when the secret is invalid json", () => {
    it("should throw an error", async () => {
      const secretName = "AdeliePenguin-invalid";
      const result = getSecretValueCommand(secretsManagerClient, secretName);

      await expect(result).rejects.toThrow(SyntaxError);
    });
  });

  describe("when the secret does not exist", () => {
    it("should throw an error", async () => {
      const secretName = faker.random.alphaNumeric(10);
      const result = getSecretValueCommand(secretsManagerClient, secretName);

      await expect(result).rejects.toThrow(ResourceNotFoundException);
    });
  });
});
