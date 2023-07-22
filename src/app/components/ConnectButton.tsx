import React, {useEffect, useState} from "react";
import {ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo, WALLET_ADAPTERS} from "@web3auth/base";
import {AuthKitSignInData, Web3AuthConfig, Web3AuthEventListener, Web3AuthModalPack} from "@safe-global/auth-kit";
import {Web3AuthOptions} from "@web3auth/modal";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

const connectedHandler: Web3AuthEventListener = (data) =>
	console.log("CONNECTED", data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
	console.log("DISCONNECTED", data);

const ConnectButton = (): React.JSX.Element => {

	const [web3AuthModalPack, setWeb3AuthModalPack] =
		useState<Web3AuthModalPack>();
	const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
		useState<AuthKitSignInData | null>(null);

	const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
		null
	);

	useEffect(() => {
		(async () => {
			const options: Web3AuthOptions = {
				//move to env
				clientId:
					"BB7C9TBAnfZHiUviCvgQinjJoPARq46Bd-kjnvOIMe1rChb4KEbtzzZDNZKIcHWD3wfpgsA2wsUYUtvAtzoBUh0-dq_paOgQp5L_jswemrJRn8" ||
					"",
				web3AuthNetwork: "testnet",
				chainConfig: {
					chainNamespace: CHAIN_NAMESPACES.EIP155,
					chainId: "0x5",
					//move to env
					rpcTarget: "https://rpc.ankr.com/eth_goerli",
				},
				uiConfig: {
					theme: "dark",
					loginMethodsOrder: ["google", "facebook"],
				},
			};

			const modalConfig = {
				[WALLET_ADAPTERS.TORUS_EVM]: {
					label: "torus",
					showOnModal: false,
				},
				[WALLET_ADAPTERS.METAMASK]: {
					label: "metamask",
					showOnDesktop: true,
					showOnMobile: false,
				},
			};

			const openloginAdapter = new OpenloginAdapter({
				loginSettings: {
					mfaLevel: "mandatory",
				},
				adapterSettings: {
					uxMode: "popup",
					whiteLabel: {
						name: "Safe",
					},
				},
			});

			const web3AuthConfig: Web3AuthConfig = {
				txServiceUrl: "https://safe-transaction-goerli.safe.global",
			};

			const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);

			await web3AuthModalPack.init({
				options,
				adapters: [],
				modalConfig,
			});

			web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

			web3AuthModalPack.subscribe(
				ADAPTER_EVENTS.DISCONNECTED,
				disconnectedHandler
			);
			console.log(web3AuthModalPack);
			setWeb3AuthModalPack(web3AuthModalPack);

			return () => {
				web3AuthModalPack.unsubscribe(
					ADAPTER_EVENTS.CONNECTED,
					connectedHandler
				);
				web3AuthModalPack.unsubscribe(
					ADAPTER_EVENTS.DISCONNECTED,
					disconnectedHandler
				);
			};
		})();
	}, []);

	useEffect(() => {
		if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
			console.log("logged in");
			(async () => {
				await login();
			})();
		}
	}, [web3AuthModalPack]);

	const login = async () => {
		if (!web3AuthModalPack) return;

		const signInInfo = await web3AuthModalPack.signIn();
		console.log("SIGN IN RESPONSE: ", signInInfo);

		const userInfo = await web3AuthModalPack.getUserInfo();
		console.log("USER INFO: ", userInfo);

		setSafeAuthSignInResponse(signInInfo);
		setUserInfo(userInfo || undefined);
		setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider);
	};

	const logout = async () => {
		if (!web3AuthModalPack) return;

		await web3AuthModalPack.signOut();

		setProvider(null);
		setSafeAuthSignInResponse(null);
	};

	return(
		<>
			{ safeAuthSignInResponse?.eoa ?
				<Button variant="contained" color="primary" size="large" onClick={logout}>
					Disconnect {safeAuthSignInResponse?.eoa}
				</Button>
				:
				<Button variant="contained" color="primary" size="large" onClick={login}>
					Connect Wallet
				</Button>
			}
		</>
	);
}

export default ConnectButton;