import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SubmitButton } from "../components/SubmitButtons";

export default function Onboarding() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            {/* first & last name */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input placeholder="Enter your first name..." />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input placeholder="Enter your last name..." />
              </div>
            </div>
            {/* Address */}
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input placeholder="Enter your address here..." />
            </div>

            <SubmitButton text="Finish onboarding"/>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
