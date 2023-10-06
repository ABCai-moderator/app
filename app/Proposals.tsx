import { useQuery } from "react-query";
import { fetchProposals } from "./api-services";
import Proposal from "./Proposal";

export default function Proposals() {
  const query = useQuery("proposals", fetchProposals);

  return query.data?.proposals?.map((proposal: any) => {
    return (
      <Proposal
        key={proposal.id}
        number={proposal.id}
        title={proposal.messages[0].content.title}
      />
    );
  });
}
