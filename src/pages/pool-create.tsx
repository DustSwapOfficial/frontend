// import { get, set } from "lodash";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addLiquidity,
  addLiquidityEth,
  approveTokenTransfer,
  getSymbol,
} from "../components/swap";
import Web3 from "web3";
import { LINEA_ROUTER_ADDRESS, RPC, getEthereum } from "../components/chain";
import ee from "../components/ee";
import { getCookie } from "../helper";
declare var window: any;

const listTab = [
  {
    id: 1,
    title: "Pools",
  },
];

const slippage = [
  {
    number: "Auto",
  },
  {
    number: 0.1,
  },
  {
    number: 0.5,
  },
  {
    number: 1,
  },
  {
    number: 3,
  },
  {
    number: "Custom",
  },
];

const guide = [
  {
    id: 1,
    title: "Put your assets to work",
    desc: "By depositing tokens, you can contribute liquidity to support traders. In return, you will be issued LP tokens that represent your share in the pool.",
  },
  {
    id: 2,
    title: "Earn from every trade",
    desc: "Earn trading fees like professional market makers. Earned fees are auto compounded in position.",
  },
  {
    id: 3,
    title: "Manage your position",
    desc: "Modify and manage your position at any time by depositing or withdrawing funds, allowing you the flexibility to adjust, increase, or decrease your holdings as desired.",
  },
  {
    id: 4,
    title: "Funds are always available",
    desc: "At your discretion, you can withdraw and obtain pool tokens whenever you desire. The pool tokens you receive already encompass the accumulated fees.",
  },
];

const guideWithdraw = [
  {
    id: 1,
    title: "Choose a percent",
    desc: "Choose how many LP shares you want to withdraw to receive the corresponding pool tokens.",
  },
  {
    id: 2,
    title: "Single or balanced",
    desc: "Decide to receive a single token or all tokens in balanced amounts.",
  },
  {
    id: 3,
    title: "Funds will arrive shortly",
    desc: "Review and submit the transaction. You will receive the funds once confirmed.",
  },
];

const withdrawNumber = [
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

const listWithdraw = [
  {
    id: 1,
    title: "Single",
  },
  {
    id: 2,
    title: "Balanced",
  },
];

const PoolCreate = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabs, setTabs] = useState < any > (listTab);
  const [chooseToken, setChooseToken] = useState < any > (0);
  const [token0, setToken0] = useState < any > ("eth");
  const [token1, setToken1] = useState < any > (null);

  const [token0Symbol, setToken0Symbol] = useState < any > ("eth");
  const [token1Symbol, setToken1Symbol] = useState < any > (null);

  const [token, setToken] = useState < any > (null);
  const [wallet, setWallet] = useState < any > (null);

  const [token0Amount, setToken0Amount] = useState < any > ("");
  const [token1Amount, setToken1Amount] = useState < any > ("");

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
          } catch (e) { }
        }
        break;
      }
    }
  }, []);

  const handleAccountsChanged = (_accounts: string[], _walletType: any) => {
    if (_accounts.length > 0) {
      setWallet(_accounts[0]);
    } else {
      setWallet(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (token0 == "eth") {
        setToken0Symbol("ETH");
      } else if (+token0?.length > 0) {
        const web3 = new Web3(RPC);
        const symbol = await getSymbol(web3, token0);
        setToken0Symbol(symbol);
      } else {
        setToken0Symbol(null);
      }
    })();
  }, [token0]);

  useEffect(() => {
    (async () => {
      if (token1 == "eth") {
        setToken1Symbol("ETH");
      } else if (+token1?.length > 0) {
        const web3 = new Web3(RPC);
        const symbol = await getSymbol(web3, token1);
        setToken1Symbol(symbol);
      } else {
        setToken1Symbol(null);
      }
    })();
  }, [token1]);

  const toggleTab = (index: any) => {
    setCurrentTab(index);
  };

  const handleChooseToken = (e: any, ct: any) => {
    setChooseToken(ct);
  };

  const handleTokenAddressChange = async (e: any) => {
    const address = e.target.value;
    if (address) {
      const web3 = new Web3(RPC);
      const symbol = await getSymbol(web3, address);
      if (symbol) {
        setToken({
          address,
          symbol,
        });
      } else {
        setToken(null);
      }
    } else {
      setToken(null);
    }
  };

  const addLiquidityClickHandler = async (e: any) => {
    if (!wallet) {
      ee.dispatch("page-message", {
        text: "Please connect wallet",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    if (!token0) {
      ee.dispatch("page-message", {
        text: "Please select token0",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    if (!token1) {
      ee.dispatch("page-message", {
        text: "Please select token1",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    if (token0 == token1) {
      ee.dispatch("page-message", {
        text: "Please select different token",
        type: "info",
        timeout: 5 * 1000,
      });
      return;
    }
    try {
      ee.dispatch("page-message", {
        text: "Processing...",
        type: "info",
        timeout: 60 * 5 * 1000,
      });
      const web3 = new Web3(getEthereum("isMetaMask"));
      if (token0 == "eth" || token1 == "eth") {
        if (token0 != "eth") {
          await approveTokenTransfer(
            web3,
            token0,
            wallet,
            LINEA_ROUTER_ADDRESS,
            token0Amount
          );
        } else if (token1 != "eth") {
          await approveTokenTransfer(
            web3,
            token1,
            wallet,
            LINEA_ROUTER_ADDRESS,
            token1Amount
          );
        }
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 500);
        });

        console.error(
          web3,
          token0 == "eth" ? token1 : token0,
          token0 == "eth" ? token1Amount : token0Amount,
          token0 == "eth" ? token0Amount : token1Amount,
          wallet
        );

        const tx = await addLiquidityEth(
          web3,
          token0 == "eth" ? token1 : token0,
          token0 == "eth" ? token1Amount : token0Amount,
          token0 == "eth" ? token0Amount : token1Amount,
          wallet
        );
        if (tx) {
          ee.dispatch("page-message", {
            text: `Comfirmed transaction`,
            type: "info",
            timeout: 5 * 1000,
          });
        }
      } else {
        await approveTokenTransfer(
          web3,
          token0,
          wallet,
          LINEA_ROUTER_ADDRESS,
          token0Amount
        );
        await approveTokenTransfer(
          web3,
          token1,
          wallet,
          LINEA_ROUTER_ADDRESS,
          token1Amount
        );

        const tx = await addLiquidity(
          web3,
          token0,
          token1,
          token0Amount,
          token1Amount,
          wallet
        );
        if (tx) {
          ee.dispatch("page-message", {
            text: `Comfirmed transaction`,
            type: "info",
            timeout: 5 * 1000,
          });
        }
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
        <Link
          to="/trade"
          className="flex items-center mb-8 text-white hover:text-primary font-bold"
        >
          <i className="lineax-arrow-small-left mr-3"></i>
          Trade
        </Link>
        <div className="md:flex justify-center items-start md:mx-[-15px]">
          <div className="md:flex-[0_0_250px] md:px-[15px] duration-200 relative mb-10 md:mb-0">
            <ul className="list-none p-0">
              {tabs.map((item: any, index: any) => {
                return (
                  <li
                    key={index}
                    onClick={() => toggleTab(item.id)}
                    className={`${currentTab == item.id ? "bg-popup " : ""
                      }cursor-pointer p-4 font-medium text-white hover:bg-popup last:pb-4 rounded-xl mb-2`}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="md:flex-[0_0_calc(100%_-_250px)] md:px-[15px]">
            {currentTab === 1 && (
              <div className="relative">
                <div className="flex items-center mb-4">
                  <i className="lineax-deposit text-gradient mr-3 text-[28px]"></i>
                  <h3 className="inline-block text-gradient">Create Pool</h3>
                </div>
                <p className="pb-8">
                  Create a pool to start earning trading fees and more rewards.
                </p>
                <div className="xl:flex xl:-mx-2.5">
                  <div className="xl:flex-[0_0_60%] xl:px-2.5 mb-8 xl:mb-0">
                    <div className="rounded-xl bg-popup lg:p-8 p-4 mb-4">
                      <div className="flex items-center mb-4"></div>
                      <div className="flex items-center mb-4">
                        <div
                          onClick={(e: any) => handleChooseToken(e, 1)}
                          className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-dark2 mr-auto"
                        >
                          <img
                            className="w-4 mr-[5px]"
                            src="/images/eth.png"
                            alt="eth"
                          />
                          <span className="mr-[5px]">{token0Symbol}</span>
                          <i className="lineax-arrow-down text-[12px]"></i>
                        </div>
                        <div className="flex items-center text-[14px]">
                          {/* <p className="mr-2">Balance 0.01</p>
                          <button className="border-primary bg-none text-primary text-[14px] h-[22px] hover:text-black w-[51px]">
                            Max
                          </button> */}
                        </div>
                      </div>
                      <input
                        className="!px-3 !bg-[#2E2E2E] !border-none font-medium text-[18px] mb-6"
                        type="number"
                        name=""
                        id=""
                        placeholder="0.0"
                        value={token0Amount}
                        onChange={(e: any) => setToken0Amount(e.target.value)}
                      />
                      <div className="flex items-center mb-4">
                        <div
                          onClick={(e: any) => handleChooseToken(e, 2)}
                          className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-dark2 mr-auto"
                        >
                          <img
                            className="w-4 mr-[5px]"
                            src="/images/usdc.png"
                            alt="usdc"
                          />
                          <span className="mr-[5px]">{token1Symbol}</span>
                          <i className="lineax-arrow-down text-[12px]"></i>
                        </div>
                        <div className="flex items-center text-[14px]">
                          {/* <p className="mr-2">Balance 0.01</p>
                          <button className="border-primary bg-none text-primary text-[14px] h-[22px] hover:text-black w-[51px]">
                            Max
                          </button> */}
                        </div>
                      </div>
                      <input
                        className="!px-3 !bg-[#2E2E2E] !border-none font-medium text-[18px]"
                        type="number"
                        name=""
                        id=""
                        placeholder="0.0"
                        value={token1Amount}
                        onChange={(e: any) => setToken1Amount(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={addLiquidityClickHandler}
                      className="w-full"
                    >
                      Create Pool
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {chooseToken > 0 && (
        <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
          <div className="mx-[15px] bg-popup rounded-xl p-4 relative w-full sm:w-[450px] h-[600px] overflow-y-auto z-[1] flex flex-col text-white">
            <div className="flex items-center mb-2.5">
              <p className="mr-auto font-semibold">Token</p>
              <i
                onClick={(e: any) => handleChooseToken(e, 0)}
                className="lineax-mark text-[14px] cursor-pointer hover:text-primary"
              ></i>
            </div>
            <div className="relative mb-5">
              <input
                className="!p-4 leading-[100%] !border-border text-[14px]"
                type="text"
                placeholder="Enter token address"
                onChange={handleTokenAddressChange}
              />
            </div>
            <div>
              {token && (
                <div className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0">
                  <div className="flex items-center mr-auto">
                    <img
                      className="w-[33px] mr-2.5"
                      src="/images/coin2.png"
                      alt="usdc"
                    />
                    <div>
                      <p className="">{token.symbol}</p>
                      <p className="">
                        {token.address?.substring(0, 5)}...
                        {token.address?.substring(token.address?.length - 5)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-color2">
                    <p
                      className=""
                      onClick={(e: any) => {
                        switch (+chooseToken) {
                          case 1: {
                            setToken0(token.address);
                            break;
                          }
                          case 2: {
                            setToken1(token.address);
                            break;
                          }
                        }
                        handleChooseToken(e, 0);
                      }}
                    >
                      Select
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0">
                <div className="flex items-center mr-auto">
                  <img
                    className="w-[33px] mr-2.5"
                    src="/images/coin2.png"
                    alt="usdc"
                  />
                  <div>
                    <p className="">ETH</p>
                  </div>
                </div>
                <div className="text-right text-color2">
                  <p
                    className=""
                    onClick={(e: any) => {
                      switch (+chooseToken) {
                        case 1: {
                          setToken0("eth");
                          break;
                        }
                        case 2: {
                          setToken1("eth");
                          break;
                        }
                      }
                      handleChooseToken(e, 0);
                    }}
                  >
                    Select
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={(e: any) => handleChooseToken(e, 0)}
            className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
          ></div>
        </div>
      )}
    </>
  );
};
export default PoolCreate;
