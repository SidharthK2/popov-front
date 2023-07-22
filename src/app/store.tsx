"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ExternalProvider } from "@ethersproject/providers";

interface ProviderState {
  provider: any;
  setProvider: (p: any) => void;
  signer: any;
  setSigner: (p: any) => void;
  ownerAddress: string;
  setOwnerAddress: (a: string) => void;
}

const useProviderStore = create<ProviderState>()(
  devtools(
    persist(
      (set) => ({
        provider: null,
        signer: null,
        ownerAddress: "",
        setProvider: (p) => set((state) => ({ provider: p })),
        setSigner: (p) => set((state) => ({ signer: p })),
        setOwnerAddress: (a) => set((state) => ({ ownerAddress: a })),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);

export default useProviderStore;
