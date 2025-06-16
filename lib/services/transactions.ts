'use server';

import { Transaction, TransactionCreate, TransactionUpdate } from '../models';
import { request } from '@/lib/services/utils';

export async function getTransactions(): Promise<Transaction[]> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
  });
}

export async function getTransaction(id: string): Promise<Transaction> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
  });
}

export async function deleteTransaction(id: string): Promise<void> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
    method: 'DELETE',
  });
}

export async function createTransaction(
  transaction: TransactionCreate,
): Promise<Transaction> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    method: 'POST',
    payload: transaction,
  });
}

export async function updateTransaction(
  transaction: TransactionUpdate,
): Promise<Transaction> {
  const { id, ...payload } = transaction;
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
    method: 'PUT',
    payload,
  });
}
