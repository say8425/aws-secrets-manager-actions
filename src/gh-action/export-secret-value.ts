import * as core from "@actions/core";

import { SecretValue } from "../types/secret-value";

export const exportSecretValue = (secretValue: SecretValue) => {
  if (typeof secretValue === "string") {
    core.exportVariable("INVALID_ASM_SECRET", secretValue);
  } else {
    for (const [key, value] of Object.entries(secretValue)) {
      core.exportVariable(key, value);
    }
  }
};
