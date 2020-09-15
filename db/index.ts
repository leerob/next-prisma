import { PrismaClient } from '@prisma/client';
import { NextPage } from 'next';

export const prisma = new PrismaClient();

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
//@ts-ignore
export type SSRProps<T> = Unpacked<ReturnType<T>>['props'];

export type SSRPage<T> = NextPage<SSRProps<T>>;
