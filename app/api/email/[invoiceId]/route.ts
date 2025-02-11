import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    //allow only those users who are authenticated
    const session = await requiredUser();

    //get params
    const { invoiceId } = await params;

    //fetch data from prisma
    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Shaily Fadadu",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "shailifadadu@gmail.com" }],

      template_uuid: "3f5af56b-569e-45a3-9c32-d3d5e0fc0320",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoEase",
        company_info_address: "College Road",
        company_info_city: "Nadiad",
        company_info_zip_code: "387001",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      {
        status: 500,
      }
    );
  }
}
