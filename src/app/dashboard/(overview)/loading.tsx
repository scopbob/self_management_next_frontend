import { Center, ProgressCircle } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100vh">
      <ProgressCircle.Root value={null} size="sm">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Center>
  );
}
