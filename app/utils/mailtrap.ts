import { MailtrapClient } from "mailtrap";

//token will be found in mailtrap API token
export const emailClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!, //add a typescript check(!) to tell that MAILTRAP_TOKEN is defined
});
