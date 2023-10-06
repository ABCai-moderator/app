import { useQuery, useQueryClient } from "react-query";

export default function Proposals() {
  const queryClient = useQueryClient();
  const query = useQuery("proposals", () => {});

  return <div>Hello</div>;
}
