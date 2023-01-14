import {
  GetSecretValueCommand,
  GetSecretValueRequest,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import { SecretValue } from "../../types/secret-value";

export const getSecretValueCommand = async (
  client: SecretsManagerClient,
  secretName: GetSecretValueRequest["SecretId"],
): Promise<SecretValue> => {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const result = await client.send(command);
  const secretValue = result.SecretString ?? "{}";

  try {
    return JSON.parse(secretValue);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return secretValue;
    }
    // istanbul ignore next
    throw error;
  }
};
