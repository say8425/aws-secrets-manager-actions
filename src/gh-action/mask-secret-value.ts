import * as core from "@actions/core";

import { SecretValue } from "../types/secret-value";

export const maskSecretValue = (secretValue: SecretValue) => {
  if (typeof secretValue === "string") {
    core.setSecret(secretValue);
  } else {
    for (const [, value] of Object.entries(secretValue)) {
      core.setSecret(String(value ?? ""));
    }
  }
};
