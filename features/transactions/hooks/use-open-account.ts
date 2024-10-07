import { create } from "zustand";

type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useOpenAccount = create<OpenAccountState>((set) => ({
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id: string) => set({ id, isOpen: true }),
}));
