import Proposal from "./Proposal";

export default function Home() {
  return (
    <main>
      <h1>Governance Proposals</h1>
      <div>
        <Proposal title="Proposal 1" description="This is a proposal" />
      </div>
    </main>
  );
}
