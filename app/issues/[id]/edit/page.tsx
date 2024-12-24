'use client'
import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";


const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {ssr: false, loading: () => <IssueFormSkeleton/>}
)

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
