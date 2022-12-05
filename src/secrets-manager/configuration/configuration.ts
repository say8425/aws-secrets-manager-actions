import { getInput } from "../../utils";

export const configuration = {
  credentials: {
    accessKeyId: getInput("AWS_ACCESS_KEY_ID"),
    secretAccessKey: getInput("AWS_SECRET_ACCESS_KEY"),
    sessionToken: getInput("AWS_SESSION_TOKEN"),
  },
  region: getInput("AWS_DEFAULT_REGION"),
};
