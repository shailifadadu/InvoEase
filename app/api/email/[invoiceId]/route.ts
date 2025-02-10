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

      subject: "Reminder Invoice Payment",
      text: "Hey you forgot to pay the invoice",
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
