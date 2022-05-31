import { createAction } from '@reduxjs/toolkit';

export const createActionWithPayload = <T>(type: string) =>
  createAction<T, string>(type);
