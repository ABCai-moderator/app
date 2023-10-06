export default function Proposal({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  return (
    <div>
      <h3>
        {number} {title}
      </h3>
    </div>
  );
}
