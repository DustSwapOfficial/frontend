import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Outlet, Link, NavLink } from "react-router-dom";
import xstore from "../components/xstore";
import ee from "../components/ee";
import Web3 from "web3";
import { getCookie, setCookie } from "../helper";
import { RPC, getEthereum } from "./chain";
import { isMobile } from "react-device-detect";
import * as web3Utils from "web3-utils";

declare var window: any;

let lastMessageTimeout: any = null;

const Layout = (props: any) => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>(0);

  const [loginWallet, setLoginWallet] = useState<boolean>(false);
  const [wallet, setWallet] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isMenuMobile, setMenuMobile] = useState(false);
  const [isSubMenu, setSubMenu] = useState(null);

  const [message, setMessage] = useState<any>({
    text: "",
    type: "", //error,warning,success,info
    timeout: 1000,
  });

  const handleAccountsChanged = (_accounts: string[], _walletType: any) => {
    if (_accounts.length > 0) {
      setConnected(true);
      setWallet(_accounts[0]);
      setCookie("login", "true", 365);
      setCookie("walletType", _walletType, 365);
      setLoginWallet(false);
    } else {
      setConnected(false);
      setCookie("login", "false", 365);
      setCookie("walletType", null, 365);
    }
  };

  useEffect(() => {
    if (isMobile && getEthereum("isMetaMask")) {
      try {
        getEthereum("isMetaMask")
          ?.request({ method: "eth_accounts" })
          .then((accounts: any) => {
            handleAccountsChanged(accounts, walletType);
          });
      } catch (e) {}
      return;
    }
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

  useEffect(() => {
    if (wallet) {
      try {
        const web3 = new Web3(RPC);
        web3.eth.getBalance(wallet).then((balance: any) => {
          setBalance(web3Utils.fromWei(balance?.toString() || 0, "ether"));
        });
      } catch (e) {}
    }
  }, [wallet]);

  const showMessage = (text: any, type: any = "info", timeout: any = 5000) => {
    if (lastMessageTimeout) {
      clearTimeout(lastMessageTimeout);
    }
    setMessage({
      text,
      type,
      timeout,
    });
    lastMessageTimeout = setTimeout(() => {
      setMessage({
        text: "",
      });
      clearTimeout(lastMessageTimeout);
    }, timeout);
  };

  const loginClickHandler = async (e: any, walletType: any) => {
    switch (+walletType) {
      case 1: {
        if (!getEthereum("isMetaMask") && isMobile) {
          window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
          return;
        } else if (getEthereum("isMetaMask")?.isMetaMask === true) {
          try {
            const accounts = await getEthereum("isMetaMask")?.request({
              method: "eth_requestAccounts",
            });
            handleAccountsChanged(accounts, walletType);
          } catch (e) {}
        } else {
          showMessage("Please install MetaMask", "error");
        }
      }
    }
  };

  const logoutClickHandler = async (e: any) => {
    setConnected(false);
    setCookie("login", "false", 365);
    setCookie("walletType", null, 365);
  };

  const pageLoadingChanged = (data: any) => {
    setLoading(data);
  };

  const pageMessageChanged = (data: any) => {
    showMessage(data?.text, data?.type, data?.timeout);
  };

  useEffect(() => {
    ee.on("page-loading", pageLoadingChanged);
    ee.on("page-message", pageMessageChanged);
    return () => {
      ee.remove("page-loading", pageLoadingChanged);
      ee.remove("page-message", pageMessageChanged);
    };
  }, []);

  const strip = (text: any) => {
    try {
      return (
        new DOMParser()?.parseFromString(text, "text/html")?.body
          ?.textContent || ""
      );
    } catch (e) {
      return "";
    }
  };

  const showLoginWallet = () => {
    setLoginWallet(!loginWallet);
  };
  const closeLoginWallet = () => setLoginWallet(false);
  const closeProfile = () => setProfile(false);
  const showProfile = () => {
    setProfile(!profile);
  };

  const showMenuMobile = () => {
    setMenuMobile(!isMenuMobile);
  };

  const handleSubMenu = (index: any) => {
    if (index != isSubMenu) setSubMenu(index);
    else setSubMenu(null);
  };

  return (
    <>
      <Helmet>
        <title>{xstore?.title}</title>
        {xstore?.description && (
          <meta name="description" content={xstore?.description} />
        )}
        {!xstore?.description && (
          <meta name="description" content={xstore?.title} />
        )}
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href={xstore?.faviconUrl} />
        {xstore?.socialThumbUrl && (
          <meta property="og:image" content={xstore?.socialThumbUrl} />
        )}
        {!xstore?.socialThumbUrl && (
          <meta property="og:image" content={xstore?.faviconUrl} />
        )}
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href={xstore?.faviconUrl} />
        {/* <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `

              @font-face {
                font-family: '${xstore?.fontFamily}';
                src: url(${xstore?.fontUrl});
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: '${xstore?.fontHeading}';
                src: url(${xstore?.fontUrlHeading});
                font-style: normal;
                font-display: swap;
              }

              h1,h2,h3 {
                font-family: ${xstore?.fontHeading}, sans-serif;
                color: ${xstore?.headingColor};
                line-height: 1;
              }

              body {
                font-family: ${xstore?.fontFamily}, sans-serif;
              }

              .btn.bg-primary:hover,
              div .primary:hover{
                color: ${xstore?.primaryColor};
              }
            `,
          }}
        /> */}
      </Helmet>

      <div className="main p-0 relative bg-bg h-full z-[1] min-h-screen">
        <header className="header z-[2] flex flex-col lg:py-[20px] py-[10px] lg:px-[50px] px-[15px] bg-header fixed w-full">
          <div className="flex items-center justify-end">
            <div className="flex items-center mr-auto">
              <p
                onClick={showMenuMobile}
                className="flex cursor-pointer text-white text-[24px] mr-4 hover-gradient lg:hidden"
              >
                <i className="lineax-bars-3-center-left"></i>
              </p>
              <Link to={"/"} className="relative z-10">
                {xstore.faviconUrl && (
                  <>
                    <img
                      className="lg:h-[53px] h-11 hidden sm:block"
                      src={xstore.page.header?.logo?.imageUrl}
                      alt={strip(xstore.page.header?.logo?.title) || ""}
                    />
                    <img
                      className="lg:h-[53px] h-11 block sm:hidden"
                      src={xstore.page.header?.logo?.imageUrl2}
                      alt={strip(xstore.page.header?.logo?.title) || ""}
                    />
                  </>
                )}
              </Link>
            </div>
            <div>
              {wallet && (
                <div>
                  <div className="flex items-center">
                    <button
                      // onClick={disconnectUnisatClickHandler}
                      className="ml-4 btn-outline hidden md:flex text-[16px] p-[8px_10px] rounded-[11px]"
                    >
                      <img
                        className="mr-2.5"
                        src="/images/linea.png"
                        alt="ETH"
                      />
                      Linea Mainnet
                    </button>
                    {/* <button
                      onClick={showProfile}
                      className="ml-4 text-[16px] p-[8px_10px] rounded-[11px]"
                    >
                      <img className="mr-2.5" src="/images/eth.png" alt="ETH" />
                      <span>{Math.round(1000 * balance) / 1000} ETH</span>
                      <i className="lineax-chevron-down ml-2.5 text-[10px]"></i>
                    </button> */}
                    <button
                      onClick={showProfile}
                      className="ml-4 btn-dark text-[16px] p-[8px_10px] rounded-[11px] bg-[#323232]"
                    >
                      <i className="lineax-wallet md:mr-2.5 text-[24px]"></i>
                      <span className="hidden md:flex">
                        {wallet.substring(0, 4)}...
                        {wallet.substring(wallet.length - 4, wallet.length)}
                      </span>
                    </button>
                  </div>
                  {profile && wallet && (
                    <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0 px-[15px]">
                      <div className="bg-popup rounded-xl p-[20px_15px] text-center sm:p-[30px] w-full sm:w-[460px] z-[1] flex flex-col justify-center relative">
                        <i
                          onClick={closeProfile}
                          className="lineax-mark cursor-pointer mb-6 ml-auto hover:text-primary text-white"
                        ></i>
                        <img
                          className="mx-auto rounded-full mb-5 border border-white"
                          src="/images/avt.png"
                          alt=""
                        />
                        <p className="text-gradient md:text-[16px] mb-5 ">
                          {wallet.substring(0, 6)}...
                          {wallet.substring(wallet.length - 6, wallet.length)}
                        </p>
                        <div className="flex justify-end items-center cursor-pointer mb-5">
                          <p className="flex items-center cursor-pointer mr-auto hover:text-primary text-white">
                            Copy Address
                            <i className="ml-2 lineax-duplicate"></i>
                          </p>
                          <a
                            className="flex items-center hover:text-primary text-white"
                            href="/"
                            target="_blank"
                          >
                            View on LineaScan
                            <i className="ml-2 lineax-top-right-on-square"></i>
                          </a>
                        </div>
                        <button
                          className="w-full btn-outline justify-center mb-10 md:text-[18px] rounded-3xl py-2.5"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </button>
                        <p>Your transactions will appear here</p>
                      </div>
                      <div
                        onClick={closeProfile}
                        className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
                      ></div>
                    </div>
                  )}
                </div>
              )}
              {!wallet && (
                <div className="flex items-center">
                  <button
                    // onClick={disconnectUnisatClickHandler}
                    className="mr-4 btn-outline hidden sm:flex text-[16px] p-[8px_10px] rounded-[11px] whitespace-nowrap min-w-[170px]"
                  >
                    <img className="mr-2.5" src="/images/linea.png" alt="ETH" />
                    Linea Mainnet
                  </button>
                  <button
                    onClick={showLoginWallet}
                    className="flex justify-center items-center w-full p-[8px_20px] text-[16px] rounded-[11px]"
                  >
                    <img
                      className="w-6 h-6 mr-2"
                      src="/images/linea.png"
                      alt="linea"
                    />
                    Connect
                  </button>
                </div>
              )}
              {/* Popup Conntent Wallet */}
              {loginWallet && (
                <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
                  <div className="mx-[15px] bg-popup rounded-xl p-[20px_15px] sm:p-[30px] relative w-full sm:w-[600px] md:w-[710px] z-[1] flex flex-col justify-center">
                    <div className="flex justify-end items-center mb-4">
                      <h3 className="inline-block mr-auto">Connect Wallet</h3>
                      <i
                        onClick={closeLoginWallet}
                        className="cursor-pointer lineax-mark text-white"
                      ></i>
                    </div>
                    <p className="mb-5">
                      Connect wallet in one click to start using Dust Swap
                    </p>
                    <div className="flex flex-wrap mx-[-10px]">
                      <div className="flex-[0_0_50%] max-w-[50%] mb-[15px] items-center px-[10px] basis-full">
                        <div
                          onClick={(e) => loginClickHandler(e, 1)}
                          className={
                            "cursor-pointer sm:flex items-center justify-start p-5 bg-box rounded-xl text-center sm:text-left h-full" //referralCode == code ? "cursor-pointer" : ""
                          }
                        >
                          <img
                            className="w-[37px] sm:mr-2 mx-auto sm:ml-0 mb-3 sm:mb-0"
                            src="/images/wallets/metamask.svg"
                            alt=""
                          />
                          <h3 className="font-medium xl:text-[24px] text-[16px]">
                            Metamask Wallet
                          </h3>
                        </div>
                      </div>
                      <div
                        style={{ display: "none" }}
                        className="flex-[0_0_50%] max-w-[50%] mb-[15px] items-center px-[10px] basis-full"
                      >
                        <div
                          // onClick={loginUnisatClickHandler}
                          className={
                            "cursor-pointer sm:flex items-center p-5 bg-box rounded-xl text-center sm:text-left h-full" //referralCode == code ? "cursor-pointer" : ""
                          }
                        >
                          <img
                            className="w-[37px] sm:mr-2 mx-auto sm:ml-0 mb-3 sm:mb-0"
                            src="/images/wallets/wallet.svg"
                            alt=""
                          />
                          <h3 className="font-medium xl:text-[24px] text-[16px]">
                            WalletConnect
                          </h3>
                        </div>
                      </div>
                      <div
                        style={{ display: "none" }}
                        className="flex-[0_0_50%] max-w-[50%] mb-[15px] items-center px-[10px] basis-full"
                      >
                        <div
                          // onClick={loginUnisatClickHandler}
                          className={
                            "cursor-pointer sm:flex items-center p-5 bg-box rounded-xl text-center sm:text-left h-full" //referralCode == code ? "cursor-pointer" : ""
                          }
                        >
                          <img
                            className="w-[37px] sm:mr-2 mx-auto sm:ml-0 mb-3 sm:mb-0"
                            src="/images/wallets/argent.svg"
                            alt=""
                          />
                          <h3 className="font-medium xl:text-[24px] text-[16px]">
                            Argent
                          </h3>
                        </div>
                      </div>
                      <div
                        style={{ display: "none" }}
                        className="flex-[0_0_50%] max-w-[50%] mb-[15px] items-center px-[10px] basis-full"
                      >
                        <div
                          // onClick={loginUnisatClickHandler}
                          className={
                            "cursor-pointer sm:flex items-center p-5 bg-box rounded-xl text-center sm:text-left h-full" //referralCode == code ? "cursor-pointer" : ""
                          }
                        >
                          <img
                            className="w-[37px] sm:mr-2 mx-auto sm:ml-0 mb-3 sm:mb-0"
                            src="/images/wallets/wallet2.svg"
                            alt=""
                          />
                          <h3 className="font-medium xl:text-[24px] text-[16px]">
                            WalletConnect v2
                          </h3>
                        </div>
                      </div>
                      <div
                        style={{ display: "none" }}
                        className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_33.3333%] md:max-w-[33.33333%] mb-[15px] items-center px-[10px] basis-full"
                      >
                        <div
                          // onClick={loginUnisatClickHandler}
                          className={
                            "cursor-pointer sm:flex items-center p-5 bg-box rounded-xl text-center sm:text-left h-full" //referralCode == code ? "cursor-pointer" : ""
                          }
                        >
                          <img
                            className="w-[37px] sm:mr-2 mx-auto sm:ml-0 mb-3 sm:mb-0"
                            src="/images/wallets/ledger.svg"
                            alt=""
                          />
                          <h3 className="font-medium xl:text-[24px] text-[16px]">
                            Ledger
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-box rounded-xl p-[10px_17px]">
                      <p className="flex items-center mb-4 text-[14px] md:text-[16px]">
                        <i className="lineax-eye mr-1"></i>
                        View only permissions. We cannot do anything without
                        your approval.
                      </p>
                      <p className="flex items-center text-[14px] md:text-[16px]">
                        <i className="lineax-eye mr-1"></i>
                        New to Web3?
                        <a
                          href="#"
                          className="text-primary pl-1 opacity-80"
                          target="_blank"
                        >
                          Learn more about wallets
                        </a>
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={closeLoginWallet}
                    className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
                  ></div>
                </div>
              )}
            </div>

            <div
              className={`${isMenuMobile ? "left-0" : "-left-full lg:left-0"}
              bg-header p-[31px_14px] overflow-y-auto flex flex-col duration-75 items-center text-[14px] fixed z-[2] lg:h-[calc(100vh_-_80px)]
               sm:w-[312px] w-full h-[calc(100vh_-_62px)] lg:top-[80px] top-[62px] list-none
              `}
              onClick={() => {}}
            >
              {xstore?.page.header.menuItem.map((item: any, index: any) => {
                return (
                  <>
                    <div className="group w-full">
                      {item.url && (
                        <Link
                          key={index}
                          onClick={showMenuMobile}
                          className="p-[10px_26px] w-full flex items-center font-medium rounded-lg mb-[5px] hover-gradient-bg h-[50px]"
                          to={item.url}
                        >
                          {item.icon && (
                            <>
                              <i
                                className={`${item.icon} text-[22px] mr-3`}
                              ></i>
                            </>
                          )}
                          {item.title}
                        </Link>
                      )}
                      {!item.url && (
                        <p
                          key={index}
                          onClick={() => handleSubMenu(index)}
                          className={` ${
                            isSubMenu === index ? "gradient-bg" : ""
                          } p-[14px_26px] w-full flex items-center font-medium rounded-lg mb-[5px] hover-gradient-bg cursor-pointer h-[50px]`}
                        >
                          {item.icon && (
                            <>
                              <i
                                className={`${item.icon} text-[22px] mr-3`}
                              ></i>
                            </>
                          )}
                          {item.title}
                          {item.subMenu && (
                            <>
                              <i
                                className={`${
                                  item.iconSub
                                } text-[14px] ml-auto duration-200 ${
                                  isSubMenu === index
                                    ? " rotate-180 origin-center"
                                    : ""
                                }`}
                              ></i>
                            </>
                          )}
                        </p>
                      )}
                      {item.subMenu && isSubMenu === index && (
                        <ul className="list-none pl-0 bg-[#2e2e2e] rounded-lg sub-menu">
                          {item.subMenu.map((itemSub: any, index: any) => {
                            return (
                              <li
                                className="flex items-center pb-0"
                                key={index}
                              >
                                <NavLink
                                  onClick={showMenuMobile}
                                  className="p-[14px_26px] w-full flex items-center font-medium rounded-lg hover:bg-[#383838] hover:text-primary h-[50px]"
                                  to={itemSub.url}
                                  target={`${
                                    itemSub.url.startsWith("https://")
                                      ? "_blank"
                                      : ""
                                  }`}
                                >
                                  {itemSub.imageUrl && (
                                    <>
                                      <i
                                        className={`${itemSub.imageUrl} text-[22px] mr-3`}
                                      ></i>
                                    </>
                                  )}
                                  {itemSub.title}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </header>
        <div
          className={`${
            isMenuMobile ? "lg:ml-[312px]" : "lg:ml-[312px]"
          } relative duration-150`}
        >
          <div className="container relative">
            <Outlet />
          </div>
        </div>
      </div>
      {message?.text && (
        <div className="fixed bottom-[15px] left-[15px] z-[1000] p-[8px_5px_5px_5px] text-white bg-black text-[85%] px-[12px] rounded-[5px]">
          <span className={message.type === "error" ? "error" : ""}>
            &nbsp;
            {message.text}
          </span>
        </div>
      )}
    </>
  );
};

export default Layout;
