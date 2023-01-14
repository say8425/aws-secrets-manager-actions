import {
  GetSecretValueCommand,
  ResourceNotFoundException,
} from "@aws-sdk/client-secrets-manager";
import { faker } from "@faker-js/faker";
import { mockClient } from "aws-sdk-client-mock";

import { client } from "../configuration";
import { getSecretValueCommand } from "./get-secret-value.command";

describe("getSecretValueCommand", () => {
  const secretsManagerClient = client({
    credentials: {
      accessKeyId: faker.random.alphaNumeric(10),
      secretAccessKey: faker.random.alphaNumeric(10),
    },
    region: "ap-southeast-2",
  });

  describe("when the secret exists", () => {
    beforeEach(() => {
      const secretsManagerMock = mockClient(secretsManagerClient);
      secretsManagerMock.on(GetSecretValueCommand).resolvesOnce({
        SecretString: JSON.stringify({
          SCIENTIFIC_NAME: "Pygoscelis adeliae",
          MIN_HEIGHT: 46,
          MAX_HEIGHT: 71,
          MIN_WEIGHT: 3.6,
          MAX_WEIGHT: 6,
          SWIMMING_SPEED: 8,
          LEAPING_METERS: 3,
        }),
      });
    });

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
    beforeEach(() => {
      const secretsManagerMock = mockClient(secretsManagerClient);
      secretsManagerMock.on(GetSecretValueCommand).resolvesOnce({
        SecretString: JSON.stringify({}),
      });
    });

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
    beforeEach(() => {
      const secretsManagerMock = mockClient(secretsManagerClient);
      secretsManagerMock.on(GetSecretValueCommand).resolvesOnce({
        SecretString: "{INVALID_KEY: INVALID_VALUE}",
      });
    });

    it("should return raw secret", async () => {
      const secretName = "AdeliePenguin-invalid";
      const result = await getSecretValueCommand(
        secretsManagerClient,
        secretName,
      );

      expect(result).toEqual("{INVALID_KEY: INVALID_VALUE}");
    });
  });

  describe("when the secret does not exist", () => {
    beforeEach(() => {
      const secretsManagerMock = mockClient(secretsManagerClient);
      secretsManagerMock
        .on(GetSecretValueCommand)
        .rejectsOnce(
          new ResourceNotFoundException({ message: "", $metadata: {} }),
        );
    });

    it("should throw an error", async () => {
      const secretName = faker.random.alphaNumeric(10);
      const result = getSecretValueCommand(secretsManagerClient, secretName);

      await expect(result).rejects.toThrow(ResourceNotFoundException);
    });
  });
});
