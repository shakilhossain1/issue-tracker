import prisma from "@/prisma/client";
import {Box, Flex, Grid} from "@radix-ui/themes";
import {notFound} from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";

type Params = Promise<{ id: string }>;

const IssueDetailsPage = async (props: { params: Params }) => {
    const params = await props.params;

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)},
    });

    if (!issue) notFound();

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap="5">
            <Box className='sm:col-span-4'>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <Flex direction={'column'} gap="3">
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;
