import { Card, Badge, Text, Group } from "@mantine/core";

export default function Proposal({
  number,
  title,
  status,
}: {
  number: number;
  title: string;
  status: string;
}) {
  const statusMap: any = {
    PROPOSAL_STATUS_VOTING_PERIOD: {
      text: "Voting",
      color: "violet",
    },
    PROPOSAL_STATUS_DEPOSIT_PERIOD: {
      text: "Deposit",
      color: "cyan",
    },
    PROPOSAL_STATUS_REJECTED: {
      text: "Rejected",
      color: "red",
    },
    PROPOSAL_STATUS_PASSED: {
      text: "Passed",
      color: "teal",
    },
  };

  return (
    <Card withBorder shadow="xs" padding="md" style={{ height: "100%" }}>
      <Group justify="space-between">
        <Text fw={500}>{title}</Text>
        <Badge color={statusMap[status]?.color} variant="light">
          {statusMap[status]?.text || status}
        </Badge>
      </Group>

      <Text size="md" c="dimmed" mt="sm">
        #{number}
      </Text>
    </Card>
  );
}
