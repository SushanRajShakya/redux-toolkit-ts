import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState, StoreDispatch } from '../state';

export const useAppDispatch = () => useDispatch<StoreDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
