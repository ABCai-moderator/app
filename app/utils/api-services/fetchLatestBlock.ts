export const fetchLatestBlock = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COSMOS_REST_RPC}/cosmos/base/tendermint/v1beta1/blocks/latest`
  );
  return (await response.json()) as {
    block?: {
      header?: {
        height?: string;
      };
    };
  };
};
