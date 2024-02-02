import { useState } from "react"
import { Link } from "react-router-dom";

const listTab = [
  {
    id: 1,
    title: "Overview"
  },
  {
    id: 2,
    title: "My Position"
  },
  {
    id: 3,
    title: "Deposit"
  },
  {
    id: 4,
    title: "Withdraw"
  }
]

const slippage = [
  {
    number: 'Auto'
  },
  {
    number: 0.1
  },
  {
    number: 0.5
  },
  {
    number: 1
  },
  {
    number: 3
  },
  {
    number: 'Custom'
  },
]

const guide = [
  {
    id: 1,
    title: "Put your assets to work",
    desc: "By depositing tokens, you can contribute liquidity to support traders. In return, you will be issued LP tokens that represent your share in the pool."
  },
  {
    id: 2,
    title: "Earn from every trade",
    desc: "Earn trading fees like professional market makers. Earned fees are auto compounded in position."
  },
  {
    id: 3,
    title: "Manage your position",
    desc: "Modify and manage your position at any time by depositing or withdrawing funds, allowing you the flexibility to adjust, increase, or decrease your holdings as desired."
  },
  {
    id: 4,
    title: "Funds are always available",
    desc: "At your discretion, you can withdraw and obtain pool tokens whenever you desire. The pool tokens you receive already encompass the accumulated fees."
  }
]

const guideWithdraw = [
  {
    id: 1,
    title: "Choose a percent",
    desc: "Choose how many LP shares you want to withdraw to receive the corresponding pool tokens."
  },
  {
    id: 2,
    title: "Single or balanced",
    desc: "Decide to receive a single token or all tokens in balanced amounts."
  },
  {
    id: 3,
    title: "Funds will arrive shortly",
    desc: "Review and submit the transaction. You will receive the funds once confirmed."
  },
]

const withdrawNumber = [
  {
    number: 25
  },
  {
    number: 50
  },
  {
    number: 75
  },
  {
    number: 100
  }
]

const listWithdraw = [
  {
    id: 1,
    title: "Single"
  },
  {
    id: 2,
    title: "Balanced"
  },
]

const PoolDetails = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabs, setTabs] = useState < any > (listTab);
  const [isMaxSlippage, setMaxSlippage] = useState(false);
  const [isMaxSlippageNumber, setMaxSlippageNumber] = useState(0);
  const [isChooseToken, setChooseToken] = useState(false)
  const [currentGuide, setCurrentGuide] = useState(1);
  const [guides, setGuides] = useState < any > (guide);
  const [isWithdrawNumber, setWithdrawNumber] = useState(null);
  const [currentWithdraw, setCurrentWithdraw] = useState(1);
  const [tabsWithdraw, setTabsWithdraw] = useState < any > (listWithdraw);
  const [currentGuideWithdraw, setCurrentGuideWithdraw] = useState(1);
  const [guidesWithdraw, setGuidesWithdraw] = useState < any > (guideWithdraw);

  const toggleTab = (index: any) => {
    setCurrentTab(index);
  };

  const handleChooseToken = () => {
    setChooseToken(!isChooseToken);
  };

  const showMaxSlippage = () => {
    setMaxSlippage(!isMaxSlippage);
  };

  const handleSlippageNumber = (index: any) => {
    if (index != isMaxSlippageNumber) setMaxSlippageNumber(index);
    else setMaxSlippageNumber(0);
  };

  const toggleGuide = (index: any) => {
    setCurrentGuide(index);
  };

  const toggleGuideWithdraw = (index: any) => {
    setCurrentGuideWithdraw(index);
  };

  const handleWithdrawNumber = (index: any) => {
    if (index != isWithdrawNumber) setWithdrawNumber(index);
    else setWithdrawNumber(null);
  };

  const toggleWidthdraw = (index: any) => {
    setCurrentWithdraw(index);
  };

  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <Link to="/pools" className="flex items-center mb-8 text-white hover:text-primary font-bold">
          <i className="lineax-arrow-small-left mr-3"></i>
          Pools
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
                )
              })}
            </ul>
          </div>
          <div className="md:flex-[0_0_calc(100%_-_250px)] md:px-[15px]">
            {currentTab === 1 &&
              <div className="relative">
                <div className="flex items-center mb-4">
                  <i className="lineax-pool-solid text-gradient mr-3 text-[26px]"></i>
                  <h3 className="inline-block text-gradient">Classic Pool</h3>
                </div>
                <p className="flex items-center text-color mb-5">
                  Contract 0x768d6E...cb967f
                  <i className="lineax-duplicate ml-2 text-[18px] cursor-pointer hover:text-primary"></i>
                </p>
                <div className="inline-flex mb-5 bg-popup px-4 py-2.5 rounded-3xl justify-self-stretch">
                  <div className="flex items-center">
                    <img className="w-4 mr-[5px]" src="/images/eth.png" alt="eth" />
                    <span className="mr-[5px]">1 ETH</span>
                  </div>
                  <p className="mr-1">=</p>
                  <div className="flex items-center">
                    <img className="w-4 mr-[5px]" src="/images/usdc.png" alt="usdc" />
                    <span className="mr-[5px]">1,888.15547...</span>
                  </div>
                </div>
                <div className="rounded-xl bg-popup p-4 font-medium mb-5">
                  <p className="mb-4">Assets in Pool</p>
                  <div className="flex items-center mb-5">
                    <div className="px-4 flex items-center h-[30px] rounded-[32px] bg-dark2 cursor-pointer mr-4">
                      50%
                    </div>
                    <div className="flex items-center">
                      <img className="mr-2 w-[20px]" src="/images/eth.png" alt="usdc" />
                      <span className="text-color font-normal">808.378,28 ETH</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-4 flex items-center h-[30px] rounded-[32px] bg-dark2 cursor-pointer mr-4">
                      50%
                    </div>
                    <div className="flex items-center">
                      <img className="mr-2 w-[20px]" src="/images/usdc.png" alt="usdc" />
                      <span className="text-color font-normal">808.378,28 USDC</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-popup p-4 flex flex-wrap mb-5">
                  <div className="flex-[0_0_50%] lg:flex-1 px-2.5 mb-8 lg:mb-0">
                    <p className="pb-3">TVL</p>
                    <p className="text-white">$44.26B</p>
                  </div>
                  <div className="flex-[0_0_50%] lg:flex-1 px-2.5 mb-8 lg:mb-0">
                    <p className="pb-3">Total APR</p>
                    <p className="text-white">5.623%</p>
                  </div>
                  <div className="flex-[0_0_50%] lg:flex-1 px-2.5">
                    <p className="pb-3">Volume (24h)</p>
                    <p className="text-white">$5.4B</p>
                  </div>
                  <div className="flex-[0_0_50%] lg:flex-1 px-2.5">
                    <p className="pb-3">Fees (24h)</p>
                    <p className="text-white">$13,648,139.8</p>
                  </div>
                </div>
                <div className="rounded-xl bg-popup p-4">
                  <p className="mb-4">LP Rewards</p>
                  <div className="sm:flex sm:px-2.5">
                    <div className="flex-1 flex items-center sm:mb-0 mb-4">
                      <div className="w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border-color2 border mr-4">

                      </div>
                      <div className="text-white">
                        <p className="mb-1">Fee APR (24h)</p>
                        <p>5.62%</p>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border-color2 border mr-4">

                      </div>
                      <div className="text-white">
                        <p className="mb-1">Rewards APR</p>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {currentTab === 2 &&
              <div className="relative">
                <div className="flex items-center mb-[70px] lg:mb-[122px]">
                  <i className="lineax-mapker text-gradient mr-3 text-[26px]"></i>
                  <h3 className="inline-block text-gradient">My Position</h3>
                </div>
                <div className="text-center">
                  <img className="mx-auto mb-4" src="/images/archive-box.svg" alt="archive-box" />
                  <p className="md:text-[18px] font-medium text-primary mb-4">You have no position in this pool</p>
                  <p className="mb-4 text-white">Deposit some tokens to open a position!</p>
                  <button onClick={() => toggleTab(3)} className="btn-outline w-[230px] py-2.5 mx-auto">
                    Deposit now
                  </button>
                </div>
              </div>
            }
            {currentTab === 3 &&
              <div className="relative">
                <div className="flex items-center mb-4">
                  <i className="lineax-deposit text-gradient mr-3 text-[28px]"></i>
                  <h3 className="inline-block text-gradient">Deposit</h3>
                </div>
                <p className="pb-8">Deposit tokens to start earning trading fees and more rewards.</p>
                <div className="xl:flex xl:-mx-2.5">
                  <div className="xl:flex-[0_0_60%] xl:px-2.5 mb-8 xl:mb-0">
                    <div className="rounded-xl bg-popup lg:p-8 p-4 mb-4">
                      <div className="flex items-center mb-4">
                        <p className="text-color2 mr-auto">Tokens to deposit</p>
                        <i onClick={showMaxSlippage} className="lineax-setting text-color2 hover:text-primary cursor-pointer text-[18px]"></i>
                      </div>
                      <div className="flex items-center mb-4">
                        <div onClick={handleChooseToken} className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-dark2 mr-auto">
                          <img className="w-4 mr-[5px]" src="/images/eth.png" alt="eth" />
                          <span className="mr-[5px]">ETH</span>
                          <i className="lineax-arrow-down text-[12px]"></i>
                        </div>
                        <div className="flex items-center text-[14px]">
                          <p className="mr-2">Balance 0.01</p>
                          <button className="border-primary bg-none text-primary text-[14px] h-[22px] hover:text-black w-[51px]">Max</button>
                        </div>
                      </div>
                      <input className="!px-3 !bg-[#2E2E2E] !border-none font-medium text-[18px] mb-6" type="number" name="" id="" placeholder="0.0" />
                      <div className="flex items-center mb-4">
                        <div className="flex items-center text-white cursor-pointer px-3 h-8 rounded-[56px] bg-dark2 mr-auto">
                          <img className="w-4 mr-[5px]" src="/images/usdc.png" alt="usdc" />
                          <span className="mr-[5px]">USDC</span>
                          <i className="lineax-arrow-down text-[12px]"></i>
                        </div>
                        <div className="flex items-center text-[14px]">
                          <p className="mr-2">Balance 0.01</p>
                          <button className="border-primary bg-none text-primary text-[14px] h-[22px] hover:text-black w-[51px]">Max</button>
                        </div>
                      </div>
                      <input className="!px-3 !bg-[#2E2E2E] !border-none font-medium text-[18px]" type="number" name="" id="" placeholder="0.0" />
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="switch h-[28px] mr-4">
                        <input type="checkbox" id="switch" />
                        <label htmlFor="switch"></label>
                      </div>
                      <span className="pr-4 mr-auto">Add tokens in balanced proportion</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <p className="mr-auto">Fees</p>
                      <p className="font-bold">0.15%</p>
                    </div>
                    <button className="w-full">Deposit</button>
                  </div>
                  <div className="xl:flex-[0_0_40%] xl:px-2.5">
                    <div className="flex relative min-h-[220px] items-end mb-4 rounded-xl bg-popup p-4">
                      {guides.map((item: any, index: any) => {
                        return (
                          <>
                            {currentGuide == item.id &&
                              <div key={index} className="flex-[0_0_100%] absolute left-0 p-4">
                                <p className="mb-4 text-primary text-[14px]">{item.id}/{guides.length}</p>
                                <p className="mb-4 font-medium text-white">{item.title}</p>
                                <p className="pb-4">{item.desc}</p>
                              </div>
                            }
                            <div
                              onClick={() => toggleGuide(item.id)}
                              className={`cursor-pointer h-[4px] max-w-[25%] flex-[0_0_25%] px-2 relative z-[1]`}
                            >
                              <div className={`bg-black h-full w-full rounded ${currentGuide == item.id ? "bg-gradient" : ""
                                }`}></div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                    <div className="rounded-xl bg-popup p-4 mb-5">
                      <div className="flex items-center text-white font-medium mb-4">
                        <i className="lineax-share mr-2 text-gradient text-[18px]"></i>
                        <span className="text-gradient">Price</span>
                      </div>
                      <div className="inline-flex mb-4">
                        <div className="flex items-center">
                          <img className="w-4 mr-[5px]" src="/images/eth.png" alt="eth" />
                          <span className="mr-[5px]">1 ETH</span>
                        </div>
                        <p className="mr-1">=</p>
                        <div className="flex items-center">
                          <img className="w-4 mr-[5px]" src="/images/usdc.png" alt="usdc" />
                          <span className="mr-[5px]">1,888.15547... USDT</span>
                        </div>
                      </div>
                      <div className="inline-flex">
                        <div className="flex items-center">
                          <img className="w-4 mr-[5px]" src="/images/eth.png" alt="eth" />
                          <span className="mr-[5px]">1 ETH</span>
                        </div>
                        <p className="mr-1">=</p>
                        <div className="flex items-center">
                          <img className="w-4 mr-[5px]" src="/images/usdc.png" alt="usdc" />
                          <span className="mr-[5px]">1,888.15547... USDT</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-popup p-4">
                      <div className="flex items-center">
                        <div className="flex items-center text-white font-medium mr-auto">
                          <i className="lineax-share mr-2 text-gradient text-[18px]"></i>
                          <span>My pool share</span>
                        </div>
                        <p className="text-primary font-medium">
                          {"0% → <0.0001%"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {currentTab === 4 &&
              <div className="relative">
                <div className="flex items-center mb-4">
                  <i className="lineax-deposit text-gradient mr-3 text-[28px]"></i>
                  <h3 className="inline-block text-gradient">Withdraw</h3>
                </div>
                <p className="pb-8">Deposit tokens to start earning trading fees and more rewards.</p>
                <div className="xl:flex xl:-mx-2.5">
                  <div className="xl:flex-[0_0_60%] xl:px-2.5 mb-8 xl:mb-0">
                    <div className="flex items-center mb-4">
                      <p className="mr-auto">Amount to withdraw</p>
                      <i onClick={showMaxSlippage} className="lineax-setting text-color2 hover:text-primary cursor-pointer text-[18px]"></i>
                    </div>
                    <div className="rounded-xl bg-popup p-4 mb-5">
                      <input className="!text-[20px] !font-medium mb-3 !border-none !p-0 h-6" type="number" name="" id="" placeholder="0.0" />
                      <div className="flex items-center text-[14px] mb-6">
                        <p className="mr-auto">$0</p>
                        <p>Available 0</p>
                      </div>
                      <div className="mb-6 h-1 w-full bg-white rounded">
                        <div className="h-full bg-gradient rounded relative" style={{ width: "50%" }}>
                          <div className="h-3 w-3 rounded-full bg-gradient absolute right-0 top-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <div className="flex items-center -mx-4">
                        {withdrawNumber.map((item, index) => {
                          return (
                            <>
                              <button
                                key={index}
                                onClick={() => handleWithdrawNumber(index)}
                                className={`${isWithdrawNumber === index ? 'active-outline' : ''} h-[30px] mx-4 btn-outline flex-1 text-[16px]`}>
                                {item.number}{"%"}
                              </button>
                            </>
                          )
                        })}
                      </div>
                    </div>
                    <div className="rounded-xl bg-popup p-4 mb-5">
                      <ul className="list-none p-0 flex -mx-2 mb-5">
                        {tabsWithdraw.map((item: any, index: any) => {
                          return (
                            <li
                              key={index}
                              onClick={() => toggleWidthdraw(item.id)}
                              className={`${currentWithdraw == item.id ? "line-gradient " : ""
                                }cursor-pointer px-4 py-[11px] mx-2 font-medium flex-1 text-center before:w-full
                                 before:h-[1px] before:top-full before:left-0 relative before:absolute before:content-[""]`}
                            >
                              <span className={`${currentWithdraw == item.id ? "text-gradient" : ""} hover-gradient`}>{item.title}</span>
                            </li>
                          )
                        })}
                      </ul>
                      {currentWithdraw === 1 && (
                        <>
                          <p className="text-[14px] pb-4 mb-4 border-b border-border">You will exclusively receive the single token of your selection.</p>
                          <p className="text-[14px] pb-4">Expected to receive</p>
                          <div className="flex items-center mb-4">
                            <div className="mr-auto flex items-center">
                              <input className="mr-2" type="radio" value={'1'} id="token1" name="token" />
                              <label className="flex items-center" htmlFor="token1">
                                <img className="w-[18px] mr-2" src="/images/eth.png" alt="eth" />
                                <span className="text-[18px]">ETH</span>
                              </label>
                            </div>
                            <p>0</p>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-auto flex items-center cursor-pointer">
                              <input className="mr-2" type="radio" value={'2'} id="token2" name="token" />
                              <label className="flex items-center" htmlFor="token2">
                                <img className="w-[18px] mr-2" src="/images/usdc.png" alt="usdc" />
                                <span className="text-[18px]">USDC</span>
                              </label>
                            </div>
                            <p>0</p>
                          </div>
                        </>
                      )}
                      {currentWithdraw === 2 && (
                        <>
                          <p className="text-[14px] pb-4 mb-4 border-b border-border">You will receive all tokens in the balanced amounts.</p>
                          <p className="text-[14px] pb-4">Expected to receive</p>
                          <div className="relative">
                            <div className="flex items-center cursor-pointer mb-4">
                              <label className="flex items-center mr-auto">
                                <img className="w-[18px] mr-2" src="/images/eth.png" alt="eth" />
                                <span className="text-[18px]">ETH</span>
                              </label>
                              <p>0</p>
                            </div>
                            <div className="flex items-center cursor-pointer">
                              <label className="flex items-center mr-auto">
                                <img className="w-[18px] mr-2" src="/images/usdc.png" alt="usdc" />
                                <span className="text-[18px]">USDC</span>
                              </label>
                              <p>0</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="rounded-xl bg-popup p-4">
                      <div className="flex items-center justify-end">
                        <span className="pr-4 mr-auto">Collect as WETH</span>
                        <div className="switch h-[28px] mb-4">
                          <input type="checkbox" id="collect" />
                          <label htmlFor="collect"></label>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 text-[14px]">
                        <p className="mr-auto">Slippage</p>
                        <p className="text-primary">0%</p>
                      </div>
                      <button className="w-full">Withdraw</button>
                    </div>
                  </div>
                  <div className="xl:flex-[0_0_40%] xl:px-2.5">
                    <div className="flex relative min-h-[200px] items-end mb-4 rounded-xl bg-popup p-4">
                      {guidesWithdraw.map((item: any, index: any) => {
                        return (
                          <>
                            {currentGuideWithdraw == item.id &&
                              <div key={index} className="flex-[0_0_100%] absolute left-0 p-4">
                                <p className="mb-4 text-primary text-[14px]">{item.id}/{guideWithdraw.length}</p>
                                <p className="mb-4 font-medium text-white">{item.title}</p>
                                <p className="pb-4">{item.desc}</p>
                              </div>
                            }
                            <div
                              onClick={() => toggleGuideWithdraw(item.id)}
                              className={`cursor-pointer h-[4px] max-w-[33.3333%] flex-[0_0_33.3333%] px-2 relative z-[1]`}
                            >
                              <div className={`bg-black h-full w-full rounded ${currentGuideWithdraw == item.id ? "bg-gradient" : ""
                                }`}></div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                    <div className="rounded-xl bg-popup p-4">
                      <div className="flex items-center">
                        <div className="flex items-center text-white font-medium mr-auto">
                          <i className="lineax-share mr-2 text-gradient text-[18px]"></i>
                          <span>My pool share</span>
                        </div>
                        <p className="text-primary font-medium">
                          {"0%"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {isMaxSlippage &&
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
                    {item.number !== "Custom" &&
                      <button
                        onClick={() => handleSlippageNumber(index)}
                        className={`${isMaxSlippageNumber === index ? '!border-primary' : ''} 
                        flex-[0_0_33.33333%] max-w-[33.333333%] !bg-none !text-primary !p-2.5 h-[33px] sm:!text-[16px] mb-4 !font-medium !text-[14px] 
                        border border-transparent hover:border-primary`}
                        key={index}>
                        {item.number}
                        {typeof item.number === 'number' &&
                          <>{"%"}</>
                        }
                      </button>
                    }
                    {item.number === "Custom" &&
                      <>
                        <input
                          type="number"
                          onClick={() => handleSlippageNumber(index)}
                          placeholder="Custom"
                          className="flex-[0_0_33.33333%] max-w-[33.333333%] !bg-none !text-primary text-center !p-2.5 h-[33px] sm:!text-[16px] mb-4 
                            !font-medium !text-[14px] border !border-transparent hover:!border-primary !rounded-3xl"
                        />
                      </>
                    }
                  </>
                )
              })}
            </div>
            <button
              onClick={showMaxSlippage}
              className="!text-color !border-color !bg-none">
              Close
            </button>
          </div>
          <div
            onClick={showMaxSlippage}
            className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"
          ></div>
        </div>
      }
      {isChooseToken &&
        <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
          <div className="mx-[15px] bg-popup rounded-xl p-4 relative w-full sm:w-[450px] h-[600px] overflow-y-auto z-[1] flex flex-col text-white">
            <div className="flex items-center mb-2.5">
              <p className="mr-auto font-semibold">Token search</p>
              <i onClick={handleChooseToken} className="lineax-mark text-[14px] cursor-pointer hover:text-primary"></i>
            </div>
            <div className="relative mb-5">
              <input className="!p-4 leading-[100%] !border-border" type="text" placeholder="Search by name, symbol or address" />
            </div>
            <div>
              <div className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0">
                <div className="flex items-center mr-auto">
                  <img className="w-[33px] mr-2.5" src="/images/coin2.png" alt="usdc" />
                  <div>
                    <p className="">USDC</p>
                    <p className="text-[14px]">USD Coin</p>
                  </div>
                </div>
                <div className="text-right text-color2">
                  <p className="">1.210</p>
                  <p className="text-[14px]">$1.2</p>
                </div>
              </div>
              <div className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0">
                <div className="flex items-center mr-auto">
                  <img className="w-[33px] mr-2.5" src="/images/coin2.png" alt="usdc" />
                  <div>
                    <p className="">USDC</p>
                    <p className="text-[14px]">USD Coin</p>
                  </div>
                </div>
                <div className="text-right text-color2">
                  <p className="">1.210</p>
                  <p className="text-[14px]">$1.2</p>
                </div>
              </div>
              <div className="flex items-center p-4 cursor-pointer hover:bg-dark2 rounded-xl mb-2.5 last:mb-0">
                <div className="flex items-center mr-auto">
                  <img className="w-[33px] mr-2.5" src="/images/coin2.png" alt="usdc" />
                  <div>
                    <p className="">USDC</p>
                    <p className="text-[14px]">USD Coin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={handleChooseToken} className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"></div>
        </div>
      }
    </>
  )
}
export default PoolDetails;