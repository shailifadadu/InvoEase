interface iAppProps {
  amount: number;
  currency: "USD" | "Rs";
}

//creating function/hook to format the currency
export function formatCurrency({ amount, currency }: iAppProps) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
