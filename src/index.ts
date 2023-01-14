import * as core from "@actions/core";

import {
  exportSecretValue,
  maskSecretValue,
  outputSecretValue,
  writeSecretValue,
} from "./gh-action";
import {
  client,
  configuration,
  getSecretValueCommand,
  validateCredentials,
  validateRegion,
} from "./secrets-manager";

const run = async () => {
  const secretName = core.getInput("SECRET_NAME");
  const outputPath = core.getInput("OUTPUT_PATH");

  const secretsManagerClientConfig = configuration;
  validateCredentials(secretsManagerClientConfig.credentials);
  validateRegion(secretsManagerClientConfig.region);

  const secretsManagerClient = client(secretsManagerClientConfig);
  const secretValue = await getSecretValueCommand(
    secretsManagerClient,
    secretName,
  );

  if (!secretValue) {
    core.warning(`Secret not found: ${secretName}`);
    return;
  }

  maskSecretValue(secretValue);
  exportSecretValue(secretValue);
  outputSecretValue(secretValue);

  if (outputPath) {
    writeSecretValue(secretValue, outputPath);
  }
};

try {
  await run();
} catch (error) {
  core.setFailed((error as Error).message);
}
