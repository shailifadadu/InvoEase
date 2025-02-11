"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
//to render text of submit btn dynamically
interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

//as we will use a js bundle, so we need to mark it as use client
export function SubmitButton({ text, variant }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin " /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}
