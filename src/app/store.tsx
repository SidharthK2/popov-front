import {create} from "zustand";
import { devtools, persist } from 'zustand/middleware'
import {ExternalProvider} from "@ethersproject/providers";

interface ProviderState {
	provider: ExternalProvider | null
	setProvider: (p: ExternalProvider) => void
	ownerAddress: string
	setOwnerAddress: (a: string) => void
}

const useProviderStore = create<ProviderState>()(
	devtools(
		persist(
			(set) => ({
				provider: null,
				ownerAddress: null,
				setProvider: (p) => set((state) => ({ provider: p })),
				setOwnerAddress: (a) => set((state) => ({ ownerAddress: a })),
			}),
			{
				name: 'bear-storage',
			}
		)
	)
)

export default useProviderStore