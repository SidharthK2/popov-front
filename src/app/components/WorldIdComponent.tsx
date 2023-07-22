"use client";
import { useState } from "react";
import { BigNumber } from "ethers";
import { decode } from "@/utils/wld";
import { address, abi } from "@/constants/contract";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { ethers, ContractInterface } from "ethers";
import useProviderStore from "@/app/store";
import { EthersAdapter } from "@safe-global/protocol-kit";

export default function WorldIdVerification() {
  const ownerAddress: any = useProviderStore((state) => state.ownerAddress);
  console.log("owner address:", ownerAddress);
  const signer = useProviderStore((state) => state.signer);
  const provider = useProviderStore((state) => state.provider);
  const [proof, setProof] = useState<ISuccessResult | null>(null);
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     "https://rpc.ankr.com/polygon_mumbai"
  //   );
  //   const signer = provider.getSigner();

  const worldIdcontract = new ethers.Contract(address, abi, signer);
  //   const ethAdapter = new EthersAdapter({
  //     ethers,
  //     signerOrProvider: signer || provider,
  //   });

  //   const safeSDK = await Safe.create({
  //     ethAdapter,
  //     safeAddress,
  //   });

  const args: any = [
    ownerAddress!,
    proof?.merkle_root
      ? decode<BigNumber>("uint256", proof?.merkle_root ?? "")
      : BigNumber.from(0),
    proof?.nullifier_hash
      ? decode<BigNumber>("uint256", proof?.nullifier_hash ?? "")
      : BigNumber.from(0),
    proof?.proof
      ? decode<
          [
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
          ]
        >("uint256[8]", proof?.proof ?? "")
      : [
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
        ],
  ];

  const write = async () => {
    const iface = new ethers.utils.Interface(abi);
    const data = iface.encodeFunctionData("setWorldID", args);
    const tx = await signer.sendTransaction({ value: "0", data: data });
    console.log("reciept:", tx);
  };
  return (
    <main>
      {ownerAddress ? (
        proof ? (
          <button onClick={write}>submit tx</button>
        ) : (
          <IDKitWidget
            signal={ownerAddress}
            action="your-action"
            onSuccess={setProof}
            app_id={"app_staging_7dd2a5702b4d3d17b0d08a50a0867e56"}>
            {({ open }) => <button onClick={open}>verify with world id</button>}
          </IDKitWidget>
        )
      ) : (
        <></>
      )}
    </main>
  );
}
