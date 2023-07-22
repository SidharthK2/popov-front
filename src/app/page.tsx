"use client";
import { useEffect, useState } from "react";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  UserInfo,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";
import { EthHashInfo } from "@safe-global/safe-react-components";
import {
  AuthKitSignInData,
  Web3AuthEventListener,
  Web3AuthModalPack,
  Web3AuthConfig,
} from "@safe-global/auth-kit";
import Button from "@mui/material/Button";
import Header from "@/app/header";
import useStore from "@/app/store";
import useProviderStore from "@/app/store";
import { ethers } from "ethers";
import WorldIdVerification from "./components/WorldIdComponent";

const mock = [
  {
    feedback:
      "With on-chain DAOs, voters don’t need to trust the core team to honor the results of a vote. Smart contracts automatically implement successful proposals",
    title: "Not all DAOs are created equal",
    icon: (
      <Box
        component={"svg"}
        width={40}
        height={40}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        color={"primary.main"}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.402 9 12c0-.402-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.640 3.316m-6.640-6l6.640-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </Box>
    ),
  },
  {
    feedback:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    title: "Real Power",
    icon: (
      <Box
        component={"svg"}
        width={40}
        height={40}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        color={"primary.main"}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </Box>
    ),
  },
  {
    feedback:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "IA",
    icon: (
      <Box
        component={"svg"}
        width={40}
        height={40}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        color={"primary.main"}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </Box>
    ),
  },
];

const connectedHandler: Web3AuthEventListener = (data) =>
  console.log("CONNECTED", data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
  console.log("DISCONNECTED", data);

export default function Home() {
  const [web3AuthModalPack, setWeb3AuthModalPack] =
    useState<Web3AuthModalPack>();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<AuthKitSignInData | null>(null);

  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const setWeb3AuthProvider = useProviderStore((state) => state.setProvider);
  const setOwnerAddress = useProviderStore((state) => state.setOwnerAddress);

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

    const provider = new ethers.providers.Web3Provider(
      web3AuthModalPack.getProvider()
    );

    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    setWeb3AuthProvider(provider);
    setOwnerAddress(signInInfo.eoa);
  };

  const logout = async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  const LeftSide = () => (
    <Box data-aos={"fade-right"}>
      <Box marginBottom={2}>
        <Typography variant="h2" color="text.primary" sx={{ fontWeight: 700 }}>
          Run DAOs{" "}
        </Typography>
        <Typography
          color={"primary"}
          component={"span"}
          variant="h2"
          fontWeight={700}>
          on-chain
        </Typography>
      </Box>
      <Box marginBottom={3}>
        <Typography variant="h6" component="p" color="text.secondary">
          Popov powers protocols, treasuries and public goods
        </Typography>
      </Box>
      {safeAuthSignInResponse?.eoa ? (
        <>
          <Typography variant="h6" component="p" color="text.secondary">
            {safeAuthSignInResponse?.eoa}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={"/explore"}>
            Explore DAO
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={logout}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={login}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );

  const RightSide = () => {
    return (
      <Box
        sx={{
          height: { xs: "auto", md: 1 },
          "& img": {
            objectFit: "cover",
          },
        }}>
        <Box
          component={"img"}
          loading="lazy"
          src={
            "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          height={{ xs: "auto", md: 1 }}
          maxHeight={{ xs: 300, md: 1 }}
          width={1}
          maxWidth={1}
        />
      </Box>
    );
  };

  return (
    <Box>
      <WorldIdVerification />
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: "hidden",
        }}>
        <Header />
        <Box
          width={1}
          margin={"0 auto"}
          paddingX={0}
          paddingY={0}
          maxWidth={{ sm: 1, md: 1236 }}>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            position={"relative"}
            minHeight={{ md: 600 }}>
            <Box
              width={1}
              order={{ xs: 2, md: 1 }}
              display={"flex"}
              alignItems={"center"}>
              <Box
                maxWidth={{ sm: 720, md: 1236 }}
                width={1}
                margin={"0 auto"}
                paddingX={2}
                paddingY={{ xs: 4, sm: 6, md: 8 }}>
                <LeftSide />
              </Box>
            </Box>
            <Box
              sx={{
                flex: { xs: "0 0 100%", md: "0 0 50%" },
                position: "relative",
                maxWidth: { xs: "100%", md: "50%" },
                order: { xs: 1, md: 2 },
              }}>
              <Box
                sx={{
                  width: { xs: 1, md: "50vw" },
                  height: "100%",
                  position: "relative",
                }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}>
                  <Box
                    sx={{
                      overflow: "hidden",
                      left: "0%",
                      width: 1,
                      height: 1,
                      position: { xs: "relative", md: "absolute" },
                      clipPath: {
                        xs: "none",
                        md: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)",
                      },
                      shapeOutside: {
                        xs: "none",
                        md: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)",
                      },
                    }}>
                    <RightSide />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box width={1} height={1} data-aos={"fade-up"} component={Card}>
        <CardContent>
          <Box>
            <Box marginBottom={4}>
              <Typography
                variant="h4"
                align={"center"}
                data-aos={"fade-up"}
                gutterBottom
                sx={{
                  fontWeight: 700,
                  marginTop: 1,
                }}>
                Why on-chain?
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    width={1}
                    height={1}
                    data-aos={"fade-up"}
                    data-aos-delay={i * 100}
                    data-aos-offset={100}
                    data-aos-duration={600}
                    component={Card}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    boxShadow={0}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <Box marginBottom={1}>{item.icon}</Box>
                      <Typography
                        align={"center"}
                        variant={"h6"}
                        sx={{ fontWeight: 700 }}
                        gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography align={"center"} color="text.secondary">
                        {item.feedback}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}
