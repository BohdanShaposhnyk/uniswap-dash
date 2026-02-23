export const parseMidgradAssetName = (assetRaw: string) => {
  const [chain = "", asset = ""] = assetRaw.split(/[._-]/);
  return {
    asset,
    chain,
  };
};
