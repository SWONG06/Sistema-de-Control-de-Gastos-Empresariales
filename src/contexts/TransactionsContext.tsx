import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
  id: number;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod?: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(), // Simple ID generation
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
