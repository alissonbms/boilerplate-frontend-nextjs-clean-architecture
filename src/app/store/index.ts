import { create } from "zustand";
import { UserSlice, createUserSlices } from "./slices/userSlice";

type StoreState = UserSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSlices(...a),
}));
