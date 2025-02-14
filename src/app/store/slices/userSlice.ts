/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";

export interface UserSlice {
  users: any[];
  setUsers: (users: any[]) => void;
}

export const createUserSlices: StateCreator<UserSlice> = (set) => ({
  users: [],
  setUsers: (users: any[]) => {
    set({ users: users });
  },
});
