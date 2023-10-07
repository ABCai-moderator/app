"use client";
import { useMutation } from "react-query";
import { submitProposal } from "../utils/api-services/submitProposal";
import {
  Button,
  Input,
  Textarea,
  Stack,
  Title,
  Group,
  Notification,
} from "@mantine/core";

export default function SubmitProposal() {
  const { mutate, data, isLoading, error, reset } = useMutation({
    mutationKey: "submitProposal",
    mutationFn: submitProposal,
  });
  return (
    <Stack>
      <Title order={2}>Submit Proposal</Title>
      {data && data?.tx_response?.code === 0 && (
        <Notification title="Success" color="green" onClose={reset}>
          Proposal submitted! <br />
          hash: {data.tx_response.txhash}
        </Notification>
      )}
      {!!error && (
        <Notification title="Error" color="red" onClose={reset}>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </Notification>
      )}
      {typeof data?.tx_response?.code === "number" &&
        data.tx_response.code > 0 && (
          <Notification title="Error" color="red" onClose={reset}>
            {data.tx_response.data}
          </Notification>
        )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!("title" in e.target) || !("description" in e.target)) return;
          const title = (e.target.title as HTMLInputElement).value;
          const description = (e.target.description as HTMLInputElement).value;

          mutate({
            description,
            title,
          });
          return false;
        }}
      >
        <Stack>
          <Input type="text" name="title" placeholder="Title" required />
          <Textarea name="description" placeholder="Description" required />

          <Group justify="flex-end" mt="md">
            <Button type="submit" disabled={isLoading}>
              Send Proposal
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
