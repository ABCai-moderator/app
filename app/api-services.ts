export const fetchProposals = async () => {
  const response = await fetch(
    `${process.env.NEXT_PULIC_COSMOS_REST_RPC}/cosmos/gov/v1/proposals?pagination.reverse=true`
  );
  const proposals = await response.json();
  return proposals;
};
