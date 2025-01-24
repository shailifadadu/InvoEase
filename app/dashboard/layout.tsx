import { ReactNode } from "react";
import { requiredUser } from "../utils/hooks";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { DashboardLinks } from "../components/DashboardLinks";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  //check whether user is authenticated or not
  const session = await requiredUser();
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="logo" className="size-7" />
                <p className="text-2xl font-bold font-[Poppins]">InvoEase</p>
              </Link>
            </div>
            {/* for dashboard link */}
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
