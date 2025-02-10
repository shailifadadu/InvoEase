//dynamic route for edit invoice(used to get id through our params)

import EditInvoice from "@/app/components/EditInvoice";
import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { notFound } from "next/navigation";

//fetch the data
async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requiredUser();
  const data = await getData(invoiceId, session.user?.id as string);
  return <EditInvoice data={data} />;
}
