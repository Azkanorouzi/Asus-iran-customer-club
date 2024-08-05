import { customerData } from "@/data/customersData";
import { transactionData } from "@/data/transactionsData";
import { customerDataType, transactionDataType } from "@/types/definitions";
import { createContext, useContext } from "react";
import {
  createStore,
  StateCreator,
  useStore as useZustandStore,
} from "zustand";
import { persist } from "zustand/middleware"; // Import the persist middleware
import { PreloadedStoreInterface } from "./StoreProvider";

export interface StoreInterface {
  transactions: transactionDataType[];
  customers: customerDataType[];
  deleteCustomer: (id: string) => void;
  editCustomer: (id: string, newCustomer: customerDataType) => void;
  addCustomer: (newCustomer: customerDataType) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, newTransaction: transactionDataType) => void;
  addTransaction: (transaction: transactionDataType) => void;
}

function getDefaultInitialState() {
  return {
    transactions: transactionData,
    customers: customerData,
  } as const;
}

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  const store = createStore<StoreInterface>(
    persist(
      (set, get) => ({
        ...getDefaultInitialState(),
        ...preloadedState,
        editCustomer: (id: string, newCustomer: customerDataType) => {
          set(({ customers }: { customers: customerDataType[] }) => {
            const updatedCustomers = customers.map((customer) =>
              customer.id === id ? newCustomer : customer,
            );
            return { customers: updatedCustomers };
          });
        },
        addCustomer: (newCustomer: customerDataType) => {
          set(({ customers }: { customers: customerDataType[] }) => {
            const updatedCustomers = [newCustomer, ...customers];
            return { customers: updatedCustomers };
          });
        },
        deleteCustomer: (id: string) => {
          set(({ customers }: { customers: customerDataType[] }) => {
            const updatedCustomers = customers.filter(
              (customer) => customer.id !== id,
            );
            return { customers: updatedCustomers };
          });
        },
        editTransaction: (id: string, newTransaction: transactionDataType) => {
          set(({ transactions }: { transactions: transactionDataType[] }) => {
            const updatedTransactions = transactions.map((transaction) =>
              transaction.id === id ? newTransaction : transaction,
            );
            return { transactions: updatedTransactions };
          });
        },
        addTransaction: (newTransaction: transactionDataType) => {
          set(({ transactions }: { transactions: transactionDataType[] }) => {
            const updatedTransactions = [newTransaction, ...transactions];
            return { transactions: updatedTransactions };
          });
        },
        deleteTransaction: (id: string) => {
          set(({ transactions }: { transactions: transactionDataType[] }) => {
            const updatedTransactions = transactions.filter(
              (transaction) => transaction.id !== id,
            );
            return { transactions: updatedTransactions };
          });
        },
      }),
      {
        name: "my-app-store", // The key for the localStorage
        partialize: (state: StoreInterface) => ({
          customers: state.customers,
          transactions: state.transactions,
        }), // Specify what to persist
      },
    ) as StateCreator<StoreInterface, [], [], StoreInterface>, // Type assertion here
  );

  return store;
}
