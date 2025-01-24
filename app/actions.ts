"use server";
import { requiredUser } from "./utils/hooks";

 //imp to add use server here
//we can also write it in inline server component like login

//functions created here will run on server side


export default function onboardUser() {
  //only authenticated users can reach this route
  const session = await requiredUser();
  
}
