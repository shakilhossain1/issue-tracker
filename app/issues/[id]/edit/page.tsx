import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

const EditIssuePage = async (props: { params: tParams }) => {
  const { id: issueId } = await props.params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
