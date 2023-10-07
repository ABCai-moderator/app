export const fetchAccountInfo = async (address: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COSMOS_REST_RPC}/cosmos/auth/v1beta1/account_info/${address}`
  );
  return (await response.json()) as {
    info?: {
      address?: string;
      pub_key?: {
        type_url?: string;
        value?: string;
      };

      account_number?: string;
      sequence?: string;
    };
  };
};
