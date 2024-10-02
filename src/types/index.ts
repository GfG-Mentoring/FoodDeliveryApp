import { store } from '../store';

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;
