import * as core from "@actions/core";

export const getInput = (name: string): string => {
  return (core.getInput(name) || process.env[name]) ?? "";
};
