export const validateRegion = (region: string) => {
  if (!region) {
    throw new Error("AWS_REGION is required");
  }

  return true;
};
