//custom hook for authenticating user

import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requiredUser() {
  //no one other than logedin user shud see this dashboad
  const session = await auth();

  //if no session, redirect to login page
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
