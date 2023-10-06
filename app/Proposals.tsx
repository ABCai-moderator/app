import { useQuery } from "react-query";
import { fetchProposals } from "./api-services";
import Proposal from "./Proposal";
import { Grid } from "@mantine/core";

export default function Proposals() {
  const query = useQuery("proposals", fetchProposals, {
    refetchInterval: 1000,
  });

  const proposals = query.data?.proposals?.map((proposal: any) => {
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
