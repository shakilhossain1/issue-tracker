import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import {Skeleton} from '@/app/components'

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton  />
      </Heading>
      <Flex gap="3" className="items-center py-2">
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="mt-5">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
