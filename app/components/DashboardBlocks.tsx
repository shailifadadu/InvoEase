import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  //run multiple prisma queries
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}

export async function DashboardBlocks() {
  const session = await requiredUser();
  //get the data
  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  );

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">Based on total volume</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices Issued!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices which have been paid!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
