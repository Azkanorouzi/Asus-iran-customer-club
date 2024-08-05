import { customerData } from "@/data/customersData";
import { transactionData } from "@/data/transactionsData";
import { customerDataType, transactionDataType } from "@/types/definitions";
import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { PreloadedStoreInterface } from "./StoreProvider";

export interface StoreInterface {
  transactions: transactionDataType[];
  customers: customerDataType[];
  // Customer
  deleteCustomer: (id: string) => void;
  editCustomer: (id: string, newCustomer: customerDataType) => void;
  addCustomer: (newCustomer: customerDataType) => void;
  // Transactions
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
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    // Customer methods
    editCustomer: (id, newCustomer) => {
      set(({ customers }) => {
        const updatedCustomers = customers.map((customer) =>
          customer.id === id ? newCustomer : customer,
        );
        return { customers: updatedCustomers };
      });
    },
    addCustomer: (newCustomer) => {
      set(({ customers }) => {
        const updatedCustomers = [newCustomer, ...customers];
        return { customers: updatedCustomers };
      });
    },
    deleteCustomer: (id) => {
      set(({ customers }) => {
        const updatedCustomers = customers.filter(
          (customer) => customer.id !== id,
        );
        return { customers: updatedCustomers };
      });
    },
    // Transaction methods
    editTransaction: (id, newTransaction) => {
      set(({ transactions }) => {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === id ? newTransaction : transaction,
        );
        return { transactions: updatedTransactions };
      });
    },
    addTransaction: (newTransaction) => {
      set(({ transactions }) => {
        const updatedTransactions = [newTransaction, ...transactions];
        return { transactions: updatedTransactions };
      });
    },
    deleteTransaction: (id) => {
      set(({ transactions }) => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id,
        );
        return { transactions: updatedTransactions };
      });
    },
  }));
}
