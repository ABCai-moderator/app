import { SigningCosmosClient } from "@cosmjs/launchpad";
import { Keplr } from "@keplr-wallet/types";

async function getKeplr(): Promise<Keplr> {
  if (!(window as any).keplr) {
    throw new Error("Please install Keplr extension");
  }

  // Check if Keplr extension is initialized
  if (
    !(window as any).getOfflineSigner ||
    !(window as any).keplr.experimentalSuggestChain
  ) {
    throw new Error("Please initialize Keplr extension");
  }

  // Request Keplr to provide access to the user's wallet
  await (window as any).keplr.enable("cosmoshub-3");

  // Get the Keplr instance
  const keplr: Keplr = (window as any).keplr;

  return keplr;
}

export default async function CreateProposal() {
  const keplr: Keplr = await getKeplr();
  const offlineSigner = keplr.getOfflineSigner("evmos_9001-2");
  const accounts = await offlineSigner.getAccounts();
  const address = accounts[0].address;

  const client = new SigningCosmosClient(
    "https://grpc.evmos.lava.build:443",
    address,
    offlineSigner
  );

  // Define the proposal content
  const proposalContent = {
    type: "cosmos-sdk/TextProposal",
    value: {
      title: "My Proposal",
      description: "This is my proposal",
    },
  };

  // Create the proposal
  const result = await client.submitProposal(proposalContent, "1000000stake");

  console.log(result);
}
