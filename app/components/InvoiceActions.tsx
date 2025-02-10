import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloud,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

//get the invoive ID
interface iAppProps {
  id: string;
}

export default function InvoiceActions({ id }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <Pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloud className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <Mail className="size-4 mr-2" /> Reminder Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <Trash className="size-4 mr-2" /> Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <CheckCircle className="size-4 mr-2" /> Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
