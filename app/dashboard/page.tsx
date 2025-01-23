import React from "react";
import { requiredUser } from "../utils/hooks";
import { signOut } from "../utils/auth";

//async is allowed bcoz it's server component
export default async function DashboardRoute() {
  const session = await requiredUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
