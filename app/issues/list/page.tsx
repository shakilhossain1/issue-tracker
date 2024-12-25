import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {
  columnNames,
  IssueQuery,
} from "@/app/issues/list/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const status = params.status;
  const statuses = Object.values(Status);

  const validStatus = statuses.includes(status) ? status : undefined;
  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;
  const where = { status: validStatus };

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={params} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuePage;
