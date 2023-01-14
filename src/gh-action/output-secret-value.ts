import * as core from "@actions/core";

import { SecretValue } from "../types/secret-value";

export const outputSecretValue = (secretValue: SecretValue) => {
  if (typeof secretValue === "string") {
    core.setOutput("INVALID_ASM_SECRET", secretValue);
  } else {
    for (const [key, value] of Object.entries(secretValue)) {
      core.setOutput(key, value);
    }
  }
};
