"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"; //conform is used for both client & server side validation
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

//imp to add use server here
//we can also write it in inline server component like login

//functions created here will run on server side
//server side validation of user
export async function onboardUser(prevState: any, formData: FormData) {
  //only authenticated users can reach this route
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    //enter schema
    schema: onboardingSchema,
  });

  //check all fields are entered, if not return error
  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  //redirect user to dashboard
  return redirect("/dashboard");
}

//server side validation of createInvoice
//for CreateInvoice validation
export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requiredUser();

  //validate form data
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  //now our data is type safe
  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date, //string
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id, //FK -> one to many relation ship(1-user, many-invoice)
    },
  });

  //Once user creates invoice, send the email
  const sender = {
    email: "hello@demomailtrap.com",
    name: "Shaily Fadadu",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "shailifadadu@gmail.com" }],
    template_uuid: "b541d249-78fe-456a-8abd-b718bb71f46d",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

//for editInvoice
export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requiredUser();

  //compare form data with zod schema
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  //now data is safe
  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date, //string
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Shaily Fadadu",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "shailifadadu@gmail.com" }],
    template_uuid: "3faaa972-8029-4d34-a7e8-89ed90d84b57",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });
  return redirect("/dashboard/invoices");
}
