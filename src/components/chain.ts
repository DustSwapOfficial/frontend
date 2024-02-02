declare var window: any;

export const LINEA_MAINNET_PARAMS = {
  chainId: 59144,
  chainName: "Linea Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.linea.build"],
  blockExplorerUrls: ["https://lineascan.build"],
};

export const LINEA_TESTNET_PARAMS = {
  chainId: 59140,
  chainName: "Linea Goerli",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.goerli.linea.build"],
  blockExplorerUrls: ["https://goerli.lineascan.build"],
};

export const ETHEREUM_PARAMS: any = {
  test: LINEA_TESTNET_PARAMS,
  main: LINEA_MAINNET_PARAMS,
};

export const ETHEREUM_NETWORK =
  ETHEREUM_PARAMS[`${process.env.REACT_APP_NETWORK_CHAIN}`] ||
  LINEA_TESTNET_PARAMS;

export const LINEA_ROUTER_ADDRESS = process.env.REACT_APP_LINEA_ROUTER_ADDRESS;

export const RPC = ETHEREUM_NETWORK.rpcUrls[0];

export function validChainId(chainId: string): boolean {
  return chainId === ETHEREUM_NETWORK.chainId.toString();
}

export const getEthereum = (walletType: any) => {
  if (!window.ethereum) {
    return null;
  }
  //console.log(Array.isArray(window.ethereum.providers));
  //console.log(window.ethereum.providers);
  return Array.isArray(window.ethereum.providers)
    ? window.ethereum.providers.find((provider: any) => provider[walletType])
    : window.ethereum;
};

export const CHAIN_EXT_INFO = [
  // {
  //   title: "All chains",
  //   chain: "",
  //   icon: "/images/all.png",
  //   currency: "",
  // },
  // {
  //   title: "BNB",
  //   chain: "bnb",
  //   icon: "/images/bnb.png",
  // },
  // {
  //   title: "Linea Goerli",
  //   chain: "LINEA_testnet",
  //   icon: "/images/arb.png",
  //   currency: "ETH",
  //   currencyIcon: "/images/ether.png",
  // },
  {
    title: "Linea",
    chain: "LINEA",
    icon: "/images/zk.png",
    currency: "ETH",
    currencyIcon: "/images/ether.png",
  },
  // {
  //   title: "ETH",
  //   chain: "eth",
  //   icon: "/images/eth.png",
  // },
];
