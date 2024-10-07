import { create } from "zustand";

type OpenCategoryState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useOpenCategory = create<OpenCategoryState>((set) => ({
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id: string) => set({ id, isOpen: true }),
}));
