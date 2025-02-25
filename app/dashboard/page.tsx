import { DashboardBlocks } from "../components/DashboardBlocks";

//async is allowed bcoz it's server component
export default async function DashboardRoute() {
  return (
    <>
      <DashboardBlocks />
    </>
  );
}
