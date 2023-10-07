import { BroadcastMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/service_pb";

export const broadcast = async (txBytes: ArrayBufferLike) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COSMOS_REST_RPC}/cosmos/tx/v1beta1/txs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_bytes: Buffer.from(txBytes).toString("base64"),
        mode: BroadcastMode.SYNC,
      }),
    }
  );
  return (await response.json()) as {
    tx_response?: {
      height?: string;
      txhash?: string;
      code?: number;
      data?: string;
    };
  };
};
