import * as fs from "node:fs";

export const writeSecretValue = (
  secretValue: Record<string, unknown>,
  path: string,
) => {
  const secretValueString = JSON.stringify(secretValue);
  fs.writeFileSync(path, secretValueString, "utf8");
};
