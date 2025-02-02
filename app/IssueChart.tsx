'use client'

import { Card } from "@radix-ui/themes";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueChart({ open, inProgress, closed }: Props) {

  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  console.log(data)

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} >
          <XAxis dataKey="label"  />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{fill: 'var(--accent-9)'}}  />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
