import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const TodoCardSkeleton = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="sm" bg="white">
      <Skeleton height="20px" width="60%" mb={4} />
      <SkeletonText mt="4" noOfLines={3} />
      <Stack direction="row" mt={4}>
        <Skeleton height="40px" width="30%" />
        <Skeleton height="40px" width="30%" />
      </Stack>
    </Box>
  );
};
const TodoCardSkeletonList = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TodoCardSkeleton key={index} />
      ))}
    </>
  );
};

export default TodoCardSkeletonList;
