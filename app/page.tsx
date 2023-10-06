"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Proposals from "./Proposals";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>Governance Proposals</h1>
        <div style={{ paddingBottom: "100px" }}>
          <Proposals />
        </div>
      </main>
    </QueryClientProvider>
  );
}
