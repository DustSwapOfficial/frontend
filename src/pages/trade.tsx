import { useState, useEffect } from "react";
import { getCookie } from "../helper";
import * as web3Utils from "web3-utils";
import {
  approveTokenTransfer,
  getAmountsIn,
  getAmountsOut,
  getBalanceEth,
  getBalanceOf,
  getDecimals,
  getLiquidity,
  getWeth,
  swapETHForExactTokens,
  swapExactTokensForETH,
  swapExactTokensForTokens,
  weiToTokenAmount,
} from "../components/swap";
import Web3 from "web3";
import {
  ETHEREUM_NETWORK,
  LINEA_ROUTER_ADDRESS,
  RPC,
  getEthereum,
  validChainId,
} from "../components/chain";
import ee from "../components/ee";
const percent = [
  {
    number: 25,
  },
  {
    number: 50,
  },
  {
    number: 75,
  },
  {
    number: 100,
  },
];

// const slippage = [
//   {
//     number: "Auto",
//   },
//   {
//     number: 0.1,
//   },
//   {
//     number: 0.5,
//   },
//   {
//     number: 1,
//   },
//   {
//     number: 3,
//   },
//   {
//     number: "Custom",
//   },
// ];

const tokenList = [
  {
    symbol: "ETH",
    address: "eth",
    icon: "/images/eth.png",
    description: "",
  },
  {
    symbol: "BUSD",
    address: "0x7d43AABC515C356145049227CeE54B608342c0ad",
    icon: "/images/usdc.png",
    description: "Linea: BUSD Token",
  },
  // {
  //   symbol: "PTL3",
  //   address: "0xfe4e717f46E0c622B9CE5a159D535f86F42504b6",
  //   icon: "/images/usdc.png",
  //   description: "",
  // },
  // {
  //   symbol: "USDT4",
  //   address: "0x3435E1b764c89Ada7E1aeEda75d82d2b03EC78D2",
  //   icon: "/images/usdc.png",
  //   description: "",
  // },
];

declare var window: any;

const Trade = () => {
  const [isFlip, setFlip] = useState(-1);
  // const [isSlippage, setSlippage] = useState(false);
  // const [isMaxSlippage, setMaxSlippage] = useState(false);
  // const [isMaxSlippageNumber, setMaxSlippageNumber] = useState(0);
  const [chooseToken, setChooseToken] = useState<any>(0);
  const [wallet, setWallet] = useState<any>(null);

  const [token0, setToken0] = useState<any>("eth");
  const [token1, setToken1] = useState<any>(tokenList[1].address);

  const [token0Amount, setToken0Amount] = useState<any>("");
  const [token1Amount, setToken1Amount] = useState<any>("");

  const [gasPrice, setGasPrice] = useState<any>(0);

  const [error, setError] = useState<any>({
    amount: false,
    liquidity: false,
    pair: false,
  });

  const getError = (_error: any) => {
    if (!_error["amount"]) return "Insufficient amount";
    if (!_error["liquidity"]) return "Insufficient liquidity";
    if (!_error["pair"]) return "Please select token";
    return "";
  };

  const getChainId = async () => {
    const chainId = await window?.ethereum?.request({ method: "eth_chainId" });
    return web3Utils.hexToNumber(chainId).toString();
  };

  const validChain = async () => {
    return validChainId(await getChainId());
  };

  const handleAccountsChanged = (_accounts: string[], _walletType: any) => {
    if (_accounts.length > 0) {
      setWallet(_accounts[0]);
    } else {
      setWallet(null);
    }
  };

  const getGasPrice = async () => {
    try {
      const web3 = new Web3(RPC);
      const price = await web3.eth.getGasPrice();
      // console.error("price -> ", price);
      setGasPrice(price);
    } catch (e) {}
  };

  useEffect(() => {
    getGasPrice();

    const interval = setInterval(() => {
      getGasPrice();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (getCookie("login") == "false") {
      return;
    }

    const walletType = getCookie("walletType");
    switch (+walletType) {
      case 1: {
        if (getEthereum("isMetaMask")?.isMetaMask === true) {
          try {
            getEthereum("isMetaMask")
              ?.request({ method: "eth_accounts" })
              .then((accounts: any) => {
                handleAccountsChanged(accounts, walletType);
              });
          } catch (e) {}
        }
        break;
      }
    }
  }, []);

  const handleChooseToken = (e: any, box: any) => {
    setChooseToken(box);
  };

  const handleFlip = async (e: any, index: any, percent: any) => {
    if (index != isFlip) setFlip(index);
    else setFlip(-1);
    if (index >= 0) {
      const web3 = new Web3(RPC);
      const [balance, decimals] =
        token0 == "eth"
          ? await Promise.all([getBalanceEth(web3, wallet), 18])
          : await Promise.all([
              getBalanceOf(web3, token0, wallet),
              getDecimals(web3, token0),
            ]);

      if (balance) {
        setToken0Amount(
          Math.round(
            (10000 *
              (+weiToTokenAmount(balance.toString(), decimals) *
                percent.number)) /
              100
          ) / 10000
        );
      }
    }
  };

  const checkLiquidity = async () => {
    if (token0 && token1 && token0 != token1) {
      try {
        const web3 = new Web3(RPC);
        const liquidity = await getLiquidity(
          web3,
          token0 == "eth" ? await getWeth(web3) : token0,
          token1 == "eth" ? await getWeth(web3) : token1
        );
        // console.error("liquidity -> ", liquidity);
        if (!liquidity || +liquidity?.toString() <= 0) {
          setError({
            ...error,
            liquidity: false,
            pair: true,
          });
        } else {
          setError({
            ...error,
            liquidity: true,
            pair: true,
          });
        }
      } catch (e) {
        setError({
          ...error,
          liquidity: false,
          pair: true,
        });
      }
    } else {
      setError({
        ...error,
        pair: false,
      });
    }
  };

  const updateAmountsIn = async (_token1Amount: any) => {
    const amount = _token1Amount || token1Amount;
    if (token0 && token1 && +amount > 0) {
      // tính toán token1Amount
      const web3 = new Web3(RPC);
      const path = [
        token0 == "eth" ? await getWeth(web3) : token0,
        token1 == "eth" ? await getWeth(web3) : token1,
      ];

      const amountsIn = await getAmountsIn(web3, path, amount);
      // console.error("amountsIn -> ", amountsIn);
      if (amountsIn && amountsIn.length >= 1) {
        setToken0Amount(
          Math.round(
            +weiToTokenAmount(
              amountsIn[0].toString(),
              token0 == "eth" ? 18 : await getDecimals(web3, path[0])
            ) * 1000000
          ) / 1000000
        );
      }
    } else {
      if (amount != null && amount != "" && +amount === 0) {
        setToken0Amount("");
      }
    }
  };

  const updateAmountsOut = async (_token0Amount: any) => {
    const amount = _token0Amount || token0Amount;
    // console.error("updateAmountsOut", token0, token1, amount);
    if (token0 && token1 && +amount > 0) {
      // tính toán token1Amount
      const web3 = new Web3(RPC);
      const path = [
        token0 == "eth" ? await getWeth(web3) : token0,
        token1 == "eth" ? await getWeth(web3) : token1,
      ];

      const amountsOut = await getAmountsOut(web3, path, amount);
      if (amountsOut && amountsOut.length > 1) {
        setToken1Amount(
          Math.round(
            +weiToTokenAmount(
              amountsOut[1].toString(),
              token1 == "eth" ? 18 : await getDecimals(web3, path[1])
            ) * 10000
          ) / 10000
        );
      }
    } else {
      if (amount != null && amount != "" && +amount === 0) {
        setToken1Amount("");
      }
    }
  };

  useEffect(() => {
    // console.error("token0Amount -> ", typeof token0Amount);
    if (+token0Amount > 0) {
      setError({
        ...error,
        amount: true,
      });
    } else if (+token0Amount <= 0) {
      setError({
        ...error,
        amount: false,
      });
    }
  }, [token0Amount]);

  useEffect(() => {
    checkLiquidity();
    updateAmountsOut(token0Amount);
  }, [token0]);

  useEffect(() => {
    checkLiquidity();
    updateAmountsOut(token0Amount);
  }, [token1]);

  // const showSlippage = () => {
  //   setSlippage(!isSlippage);
  // };

  // const showMaxSlippage = () => {
  //   setMaxSlippage(!isMaxSlippage);
  // };

  // const closeMaxSlippage = () => setMaxSlippage(false);

  // const handleSlippageNumber = (index: any) => {
  //   if (index != isMaxSlippageNumber) setMaxSlippageNumber(index);
  //   else setMaxSlippageNumber(0);
  // };

  const switchToEthereumChain = async () => {
    try {
      try {
        await getEthereum("isMetaMask").request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "" + web3Utils.toHex(ETHEREUM_NETWORK.chainId) }],
        });
      } catch (switchError) {
        console.error("switchError -> ", switchError);
        await getEthereum("isMetaMask")?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...ETHEREUM_NETWORK,
              chainId: "" + web3Utils.toHex(ETHEREUM_NETWORK.chainId),
            },
          ],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const swapClickHandler = async (e: any) => {
    if (!wallet) {
      ee.dispatch("page-message", {
        text: `Please connect wallet first!`,
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    try {
      if (!(await validChain())) {
        ee.dispatch("page-message", {
          text: `Please switch to ${ETHEREUM_NETWORK?.chainName} network!`,
          type: "info",
          timeout: 5 * 1000,
        });
        switchToEthereumChain();
        return;
      }
      ee.dispatch("page-message", {
        text: `Processing...`,
        type: "info",
        timeout: 5 * 60 * 1000,
      });
      const web3 = new Web3(getEthereum("isMetaMask"));
      // chain id
      let tx = null;
      if (token0 == "eth") {
        tx = await swapETHForExactTokens(
          web3,
          token0Amount,
          token1,
          wallet,
          wallet
        );
        // console.error("tx", tx);
      } else if (token1 == "eth") {
        const txApprove = await approveTokenTransfer(
          web3,
          token0,
          wallet,
          LINEA_ROUTER_ADDRESS,
          token0Amount
        );
        if (txApprove) {
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(null);
            }, 500);
          });
          tx = await swapExactTokensForETH(
            web3,
            token0,
            token0Amount,
            wallet,
            wallet
          );
        }
        // console.error("tx", tx);
      } else if (token0 != "eth" && token1 != "eth") {
        const txApprove = await approveTokenTransfer(
          web3,
          token0,
          wallet,
          LINEA_ROUTER_ADDRESS,
          token0Amount
        );
        if (txApprove) {
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(null);
            }, 500);
          });
          tx = await swapExactTokensForTokens(
            web3,
            token0,
            token1,
            token0Amount,
            wallet,
            wallet
          );
        }
      }
      if (tx) {
        ee.dispatch("page-message", {
          text: `Comfirmed transaction`,
          type: "info",
          timeout: 5 * 1000,
        });
      }
    } catch (e: any) {
      console.error("swapClickHandler -> e", e);
      ee.dispatch("page-message", {
        text: e.reason || e.data?.message || e.error?.message || e.message,
        type: "error",
        timeout: 5 * 1000,
      });
    }
  };

  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <h1 className="hidden">Trade</h1>
        <div className="lg:max-w-[585px] mx-auto">
          <div className=" rounded-[18px] bg-popup p-5 mb-5">
            <div className="flex justify-end mb-2">
              <input
                className="mr-auto lg:!text-[24px] !text-[18px] h-[44px] border-none !font-normal !py-1 !pl-0 flex-1"
                type="number"
                placeholder={"0"}
                value={token0Amount}
                onChange={(e) => {
                  setFlip(-1);
                  if (!isNaN(e.target.value as any)) {
                    setToken0Amount(e.target.value);
                    updateAmountsOut(+e.target.value);
                  } else {
                    setToken0Amount("");
                    updateAmountsOut(0);
                  }
                }}
              />
              <div
                onClick={(e) => handleChooseToken(e, 1)}
                className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-dark2"
              >
                <img
                  className="w-4 mr-[5px]"
                  src={
                    tokenList.find((item: any) => item.address == token0)?.icon
                  }
                  alt="eth"
                />
                <span className="mr-[5px]">
                  {
                    tokenList.find((item: any) => item.address == token0)
                      ?.symbol
                  }
                </span>
                <i className="lineax-arrow-down text-[12px]"></i>
              </div>
            </div>
            {/* <p className="text-color2 mb-7">$2,754,027.64</p> */}
            <div className="flex -mx-2">
              {percent.map((item: any, index: any) => {
                return (
                  <button
                    onClick={(e) => handleFlip(e, index, item)}
                    className={`${
                      isFlip === index ? "active-outline" : ""
                    } flex-1 btn-outline !p-2.5 h-[33px] mx-2 sm:!text-[16px] !text-[14px]`}
                    key={index}
                  >
                    {item.number}
                    {"%"}
                  </button>
                );
              })}
            </div>
          </div>
          <div className=" rounded-[18px] bg-popup p-5 mb-5">
            <div className="flex justify-end mb-2">
              <input
                className="mr-auto lg:!text-[24px] !text-[18px] h-[44px] border-none !font-normal !py-1 !pl-0 flex-1"
                type="number"
                placeholder="0"
                value={token1Amount}
                onChange={(e: any) => {
                  setFlip(-1);
                  if (!isNaN(e.target.value as any)) {
                    setToken1Amount(e.target.value);
                    updateAmountsIn(+e.target.value);
                  } else {
                    setToken1Amount("");
                    updateAmountsIn(0);
                  }
                }}
              />
              <div
                onClick={(e) => handleChooseToken(e, 2)}
                className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-[#121212]"
              >
                <img
                  className="w-4 mr-[5px]"
                  src={
                    tokenList.find((item: any) => item.address == token1)?.icon
                  }
                  alt="token"
                  onChange={(e: any) => {
                    if (!isNaN(e.target.value as any)) {
                      setToken1Amount(e.target.value);
                    } else {
                      setToken1Amount("");
                    }
                    updateAmountsOut(0);
                  }}
                />
                <span className="mr-[5px] text-primary">
                  {
                    tokenList.find((item: any) => item.address == token1)
                      ?.symbol
                  }
                </span>
                <i className="lineax-arrow-down text-[12px]"></i>
              </div>
            </div>
            {/* <p className="text-color2">$2,754,027.64</p> */}
          </div>
          <div className=" rounded-[18px] bg-popup p-5 mb-5">
            <div className="flex mb-4">
              <div className="flex items-center">
                <img
                  className="w-4 mr-[5px]"
                  src={
                    tokenList.find((item: any) => item.address == token0)?.icon
                  }
                  alt="eth"
                />
                <span className="mr-[5px]">
                  {token0Amount}{" "}
                  {
                    tokenList.find((item: any) => item.address == token0)
                      ?.symbol
                  }
                </span>
              </div>
              <p className="mr-1">=</p>
              <div className="flex items-center">
                <img
                  className="w-4 mr-[5px]"
                  src={
                    tokenList.find((item: any) => item.address == token1)?.icon
                  }
                  alt="usdc"
                />
                <span className="mr-[5px]">
                  {token1Amount}&nbsp;
                  {
                    tokenList.find((item: any) => item.address == token1)
                      ?.symbol
                  }
                </span>
              </div>
            </div>
            <div
              // onClick={showSlippage}
              className="flex items-center cursor-pointer"
            >
              <i className="lineax-gas text-[16px] mr-1"></i>
              <span className="mr-[5px]">
                {Math.round(
                  100 * +web3Utils.fromWei(gasPrice?.toString() || 0, "Gwei")
                ) / 100}{" "}
                Gwei
              </span>
              {/* <i
                className={`${
                  isSlippage ? "-rotate-180 origin-center " : ""
                }lineax-arrow-down text-[12px]`}
              ></i> */}
            </div>
          </div>
          {/* {isSlippage && (
            <div className=" rounded-[18px] bg-popup p-5 mb-5">
              <div className="flex items-center justify-end mb-4">
                <p className="mr-auto text-color2">Gas Refund</p>
                <span className="bg-gradient py-1 px-3 rounded-[53px] text-[14px] text-black">
                  Up to 99%
                </span>
              </div>
              <div className="flex items-center justify-end mb-4">
                <p className="mr-auto text-color2">Price Impact</p>
                <p className="text-primary">{"<0.01%"}</p>
              </div>
              <div className="flex items-center justify-end mb-4">
                <p className="mr-auto text-color2">Min Received</p>
                <p className="">{">9,000,000B USDC"}</p>
              </div>
              <div className="flex items-center justify-end">
                <p className="mr-auto text-color2">Max Slippage</p>
                <div className="rounded py-1 px-3 bg-[rgba(71,207,255,0.1)] flex items-center">
                  0.18
                  {"%"}
                  <i
                    onClick={showMaxSlippage}
                    className="lineax-pencil ml-2 cursor-pointer"
                  ></i>
                </div>
              </div>
            </div>
          )} */}
          <button
            disabled={getError(error) != ""}
            onClick={swapClickHandler}
            className="w-full cursor-pointer"
          >
            {getError(error) || "Swap"}
          </button>
          <div className="mt-5 rounded-[18px] bg-popup p-5">
            <div className="flex items-center justify-end mb-4">
              <p className="flex items-center mr-auto">
                <i className="lineax-cube-transparent text-[18px] mr-2"></i>
                Router
              </p>
              <i className="lineax-mark text-[14px] hover:text-primary cursor-pointer"></i>
            </div>
            <div className="mb-4 pb-4 border-b border-border">
              <div className="sm:max-w-[85%] mx-auto relative">
                <div className="border-b border-color2 border-dashed absolute top-1/2 -translate-y-1/2 w-full"></div>
                <div className="flex items-center relative z-[1]">
                  <div className="flex-1">
                    <i className="lineax-ellipse"></i>
                  </div>
                  <div className="flex-1">
                    <p className="inline-block rounded-[6px] p-2 bg-dark2 text-white text-[14px]">
                      100%
                      <i className="lineax-chevron-right text-[12px] ml-1"></i>
                    </p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="inline-block rounded-[6px] p-2 bg-dark2">
                      <img src="/images/coin1.png" alt="" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="inline-block rounded-[6px] p-2 bg-dark2">
                      <img src="/images/coin1.png" alt="" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <i className="lineax-ellipse"></i>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[14px] text-color2">
              The router optimizes the output of your trade by considering hops
              and split routes.
            </p>
          </div>
        </div>
        {/* {isMaxSlippage && (
          <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
            <div className="mx-[15px] bg-popup rounded-xl p-[20px_15px_0_15px] sm:p-[30px_30px_15px_30px] relative w-full sm:w-[360px] z-[1] flex flex-col justify-center">
              <div className="flex items-center justify-end mb-4">
                <p className="flex items-center text-white font-medium mr-auto">
                  <i className="lineax-share text-gradient text-[18px] mr-2"></i>
                  Max Slippage
                </p>
                <p className="text-[14px]">Auto 0.18%</p>
              </div>
              <div className="flex flex-wrap -mx-2">
                {slippage.map((item, index) => {
                  return (
                    <>
                      {item.number !== "Custom" && (
                        <button
                          onClick={() => handleSlippageNumber(index)}
                          className={`${
                            isMaxSlippageNumber === index
                              ? "!border-primary"
                              : ""
                          } 
                        flex-[0_0_33.33333%] max-w-[33.333333%] !bg-none !text-primary !p-2.5 h-[33px] sm:!text-[16px] mb-4 !font-medium !text-[14px] 
                        border border-transparent hover:border-primary`}
                          key={index}
                        >
                          {item.number}
                          {typeof item.number === "number" && <>{"%"}</>}
                        </button>
                      )}
                      {item.number === "Custom" && (
                        <>
                          <input
                            type="number"
                            onClick={() => handleSlippageNumber(index)}
                            placeholder="Custom"
                            className="flex-[0_0_33.33333%] max-w-[33.333333%] !bg-none !text-primary text-center !p-2.5 h-[33px] sm:!text-[16px] mb-4 
                            !font-medium !text-[14px] border !border-transparent hover:!border-primary !rounded-3xl"
                          />
                        </>
                      )}
                    </>
                  );
                })}
              </div>
              <button
                onClick={closeMaxSlippage}
                className="!text-color !border-color !bg-none"
              >
                Close
              </button>
            </div>
            <div
              onClick={closeMaxSlippage}
              className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
            ></div>
          </div>
        )} */}
      </div>
      {(chooseToken == 1 || chooseToken == 2) && (
        <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
          <div className="mx-[15px] bg-popup rounded-xl p-4 relative w-full sm:w-[450px] h-[600px] overflow-y-auto z-[1] flex flex-col text-white">
            <div className="flex items-center mb-2.5">
              <p className="mr-auto font-semibold">Token search</p>
              <i
                onClick={(e) => handleChooseToken(e, 0)}
                className="lineax-mark text-[14px] cursor-pointer hover:text-primary"
              ></i>
            </div>
            <div className="relative mb-5">
              <input
                className="!p-4 leading-[100%] !border-border"
                type="text"
                placeholder="Search by name, symbol or address"
              />
            </div>
            <div>
              {tokenList?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0"
                    onClick={(e) => {
                      switch (+chooseToken) {
                        case 1: {
                          setToken0(item.address);
                          break;
                        }
                        case 2: {
                          setToken1(item.address);
                          break;
                        }
                      }
                      setChooseToken(0);
                    }}
                  >
                    <div className="flex items-center mr-auto">
                      <img
                        className="w-[33px] mr-2.5"
                        src={item.icon || "/images/coin2.png"}
                        alt="usdc"
                      />
                      <div>
                        <p className="">{item.symbol}</p>
                        <p className="text-[14px]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            onClick={(e) => handleChooseToken(e, 0)}
            className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
          ></div>
        </div>
      )}
    </>
  );
};
export default Trade;
