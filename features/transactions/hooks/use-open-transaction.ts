import { create } from "zustand";

type OpenTransactionState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useOpenTransaction = create<OpenTransactionState>((set) => ({
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id: string) => set({ id, isOpen: true }),
}));
