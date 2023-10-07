import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { MsgSubmitProposal } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/tx_pb";
import { TextProposal } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/gov_pb";
import { getKeplr } from "../keplr";
import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { PubKey } from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";
import { fetchAccountInfo } from "./fetchSequence";
import { broadcast } from "./broadcast";
import { fetchLatestBlock } from "./fetchLatestBlock";

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ?? "evmos_9000-4";
const baseDenom = process.env.NEXT_PUBLIC_BASE_DENOM ?? "atevmos";

export type Proposal = {
  title: string;
  description: string;
  initialDeposit?: {
    denom: string;
    amount: string;
  };
};
export const submitProposal = async ({
  initialDeposit = { denom: baseDenom, amount: "1" },
  title,
  description,
}: Proposal) => {
  const keplr = await getKeplr();
  const { bech32Address, pubKey } = await keplr.getKey(chainId);

  const { info } = await fetchAccountInfo(bech32Address);
  console.log(info);
  if (
    typeof info?.sequence === "undefined" ||
    typeof info.account_number === "undefined"
  ) {
    throw new Error("Account info not found");
  }

  const { block } = await fetchLatestBlock();
  const height = block?.header?.height;
  if (typeof height === "undefined") {
    throw new Error("Could not fetch latest block");
  }
  const sequence = BigInt(info.sequence);
  const accountNumber = info.account_number;
  const tx = new Tx({
    body: {
      messages: [
        {
          typeUrl: `/${MsgSubmitProposal.typeName}`,
          value: new MsgSubmitProposal({
            content: {
              typeUrl: `/${TextProposal.typeName}`,
              value: new TextProposal({
                title,
                description,
              }).toBinary(),
            },
            initialDeposit: [initialDeposit],
            proposer: bech32Address,
          }).toBinary(),
        },
      ],
      timeoutHeight: BigInt(height) + 500n,
    },
    authInfo: {
      fee: {
        amount: [{ amount: "500000000000000000", denom: baseDenom }],
        gasLimit: 20000000n,
      },
      signerInfos: [
        {
          publicKey: {
            typeUrl: `/${PubKey.typeName}`,
            value: new PubKey({
              key: pubKey,
            }).toBinary(),
          },
          modeInfo: {
            sum: {
              case: "single",
              value: {
                mode: SignMode.DIRECT,
              },
            },
          },
          sequence,
        },
      ],
    },
  });

  const { signature } = await keplr.signDirect(chainId, bech32Address, {
    // @ts-expect-error keplr types are lying, it does accept string
    accountNumber,
    authInfoBytes: tx.authInfo?.toBinary(),
    bodyBytes: tx.body?.toBinary(),
    chainId: chainId,
  });

  tx.signatures = [Buffer.from(signature.signature, "base64")];

  return broadcast(tx.toBinary());
};
