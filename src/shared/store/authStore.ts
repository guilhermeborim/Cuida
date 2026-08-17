import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserStore {
  token: string | null;

  setSession: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: null,

      logout: () => set({ token: null }),
      setSession: (token) => set({ token }),
    }),
    {
      name: "cuida-auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
