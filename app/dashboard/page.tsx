import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";

//async is allowed bcoz it's server component
export default async function DashboardRoute() {
  return (
    <>
      <DashboardBlocks />
      {/* render the graph */}
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
        <h1 className="bg-red-500 col-span-1">Yoo this is about 30%</h1>
      </div>
    </>
  );
}
