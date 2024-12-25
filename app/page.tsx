import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: Promise<{ page: "string" }>;
}

export default async function Home({ searchParams }: Props) {
  const sParams = await searchParams;

  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(sParams.page)}
      />
    </div>
  );
}
