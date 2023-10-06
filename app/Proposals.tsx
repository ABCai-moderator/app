import { useQuery } from "react-query";
import { fetchProposals } from "./api-services";
import Proposal from "./Proposal";
import { Grid, Loader } from "@mantine/core";

export default function Proposals() {
  const { data, isLoading } = useQuery("proposals", fetchProposals, {
    refetchInterval: 2000,
  });

  if (isLoading && !data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  const proposals = data?.proposals?.map((proposal: any) => {
    return (
      <Grid.Col span={{ base: 12, md: 6 }} key={proposal.id}>
        <Proposal
          status={proposal.status}
          number={proposal.id}
          title={proposal.messages[0]?.content?.title}
        />
      </Grid.Col>
    );
  });

  return <Grid>{proposals}</Grid>;
}
