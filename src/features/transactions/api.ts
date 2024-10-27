import { Transaction } from "../../types/Transaction";

export async function fetchTransactions(
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  const url = `${process.env.NEXT_PUBLIC_TRANSACTION_API_BASE_URL}/api/v1/transactions/?startDate=${startDate}&endDate=${endDate}`;
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Basic " + process.env.NEXT_PUBLIC_TRANSACTION_API_BASE64_AUTH_TOKEN,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1231",
    }),
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json() as Promise<Transaction[]>;
}
