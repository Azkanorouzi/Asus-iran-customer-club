export interface customerDataType {
  id: string;
  name: string;
  age: number;
  transactions: string[];
  status: "happy" | "neutral" | "sad";
}

export interface transactionDataType {
  id: string;
  by: string;
  profit: number;
  numberOfBoughtItems: number;
}
