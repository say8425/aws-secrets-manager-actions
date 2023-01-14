import * as fs from "node:fs";

import { SecretValue } from "../types/secret-value";

export const writeSecretValue = (secretValue: SecretValue, path: string) => {
  const secretValueString =
    typeof secretValue === "string" ? secretValue : JSON.stringify(secretValue);
  fs.writeFileSync(path, secretValueString, "utf8");
};
