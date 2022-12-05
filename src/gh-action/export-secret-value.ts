import * as core from "@actions/core";

export const exportSecretValue = (secretValue: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(secretValue)) {
    core.setSecret(String(value ?? ""));
    core.exportVariable(key, value);
  }
};
