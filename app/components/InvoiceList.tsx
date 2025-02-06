import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import InvoiceActions from "./InvoiceActions";

export default function InvoiceList() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*render table body*/}
        <TableBody>
          <TableRow>
            <TableCell>#1</TableCell>
            <TableCell>Shaily Fadadu</TableCell>
            <TableCell>$55.00</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>6/2/2025</TableCell>
            <TableCell className="text-right">
              <InvoiceActions />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
