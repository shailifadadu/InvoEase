import CreateInvoice from "@/app/components/CreateInvoice";
import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";

//fetch From data
async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  return data;
}

export default async function InvoiceCreationRoute() {
  //get the userId
  const session = await requiredUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      firstName={data?.firstName as string}
      address={data?.address as string}
      email={data?.email as string}
    />
  );
}
