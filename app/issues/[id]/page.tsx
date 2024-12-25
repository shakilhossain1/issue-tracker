import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import { cache } from "react";

type Params = Promise<{ id: string }>;

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);

const IssueDetailsPage = async (props: { params: Params }) => {
  const session = await getServerSession(authOptions);
  const params = await props.params;

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap="3">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: Params }) {
  const id = (await params).id;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: "Details of issue" + issue?.title,
  };
}

export default IssueDetailsPage;
