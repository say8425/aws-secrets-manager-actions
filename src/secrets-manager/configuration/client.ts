import {
  SecretsManagerClient,
  SecretsManagerClientConfig,
} from "@aws-sdk/client-secrets-manager";

export const client = ({ credentials, region }: SecretsManagerClientConfig) =>
  new SecretsManagerClient({
    credentials,
    region,
  });
