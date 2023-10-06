import { useQuery, useQueryClient } from "react-query";
import { fetchProposals } from "./api-services";

export default function Proposals() {
  const queryClient = useQueryClient();
  const query = useQuery("proposals", fetchProposals);

  return <div>Hello</div>;
}
