import {
  GetSecretValueCommand,
  GetSecretValueRequest,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const getSecretValueCommand = async (
  client: SecretsManagerClient,
  secretName: GetSecretValueRequest["SecretId"],
) => {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const result = await client.send(command);
  const secretValue = result.SecretString;

  return secretValue ? JSON.parse(secretValue) : {};
};
