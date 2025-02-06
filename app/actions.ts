"use server";
//server side validation of user
import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"; //conform is used for both client & server side validation
import { onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

//imp to add use server here
//we can also write it in inline server component like login

//functions created here will run on server side

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
