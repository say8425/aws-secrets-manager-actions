import { Credentials } from "@aws-sdk/types";

export const validateCredentials = ({
  accessKeyId,
  secretAccessKey,
  sessionToken,
}: Credentials) => {
  if (!accessKeyId && !secretAccessKey && !sessionToken) {
    throw new Error(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or AWS_SESSION_TOKEN is required",
    );
  }
  if ((!accessKeyId || !secretAccessKey) && !sessionToken) {
    throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required");
  }

  return true;
};
