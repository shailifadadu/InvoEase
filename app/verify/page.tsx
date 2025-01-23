import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[380px] px-5">
        <CardHeader>
          <div className="flex mx-auto size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>

          <CardTitle></CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
