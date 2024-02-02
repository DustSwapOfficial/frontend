import { useState } from "react"
const Wizard = () => {
  const [isChoose, setChoose] = useState(false)
  const [isChooseToken, setChooseToken] = useState(false)

  const handleChoose = () => {
    setChoose(!isChoose);
  };
  const handleChooseToken = () => {
    setChooseToken(!isChooseToken);
  };
  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <div className="flex items-center mb-4">
          <i className="lineax-beaker text-gradient mr-3 text-[26px]"></i>
          <h1 className="md:text-[32px] inline-block text-gradient">Pool Wizard</h1>
        </div>
        <p className="mb-[60px] text-color2">Let me help you find the best pools and manage them.</p>
        <div className="flex items-center overflow-x-auto whitespace-nowrap pb-[60px]">
          <div className="mr-2">
            <p className="flex items-center">
              <span className="mr-2.5 text-[14px] text-black bg-gradient rounded-full w-[31px] h-[31px] items-center justify-center flex">1</span>
              Choose type
            </p>
          </div>
          <div className="flex-[1_1_auto]">
            <div className="border-b border-color2"></div>
          </div>
          <div className="m-2">
            <p className="flex items-center">
              <span className="mr-2.5 text-[14px] text-black bg-gradient rounded-full w-[31px] h-[31px] items-center justify-center flex">2</span>
              Choose token
            </p>
          </div>
          <div className="flex-[1_1_auto]">
            <div className="border-b border-color2"></div>
          </div>
          <div className="ml-2">
            <p className="flex items-center">
              <span className="mr-2.5 text-[14px] text-black bg-gradient rounded-full w-[31px] h-[31px] items-center justify-center flex">
                <i className="lineax-check text-white"></i>
              </span>
              Complete
            </p>
          </div>
        </div>
        <div className="md:flex justify-center items-start md:-mx-2.5">
          <div className="md:flex-[0_0_33.33333%] md:px-2.5 duration-200 relative mb-10 md:mb-0">
            <div className="rounded-xl bg-popup p-4 text-white font-medium">
              <div className="flex items-center pb-5">
                <p className="mr-auto">Choose</p>
                <p onClick={handleChoose} className="text-[20px] cursor-pointer">+</p>
              </div>
              <p className="pb-5">Pool type</p>
              <div className="flex items-center p-4 h-[42px] rounded-md bg-dark2 w-[168px] cursor-pointer mb-5">
                <p className="text-primary flex items-center text-gradient mr-auto"><i className="mr-2 lineax-ellipse text-gradient"></i>Classic</p>
                <i className="lineax-chevron-right text-gradient text-[14px]"></i>
              </div>
              <p className="pb-5">Pool tokens</p>
              <div onClick={handleChooseToken} className="rounded-[16px_16px_0_0] p-4 bg-[#2E2E2E] flex items-center cursor-pointer">
                <div className="flex items-center mr-auto">
                  <span className="text-[14px] mr-4">1</span>
                  <img className="mr-2 w-[24px]" src="/images/eth.png" alt="eth" />
                  <span className="text-color">ETH</span>
                </div>
                <i className="lineax-chevron-right text-[14px]"></i>
              </div>
              <div className="rounded-[0_0_16px_16px] p-4 bg-[#2E2E2E] flex items-center cursor-pointer mb-5">
                <div className="flex items-center mr-auto">
                  <span className="text-[14px] mr-4">2</span>
                  <img className="mr-2 w-[24px]" src="/images/usdc.png" alt="usdc" />
                  <span className="text-color">USDC</span>
                </div>
                <i className="lineax-chevron-right text-[14px]"></i>
              </div>
              <button className="w-full">Enter Pool</button>
            </div>
          </div>
          {isChoose &&
            <div className="md:flex-[0_0_66.6667%] md:px-2.5">
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
        </div>
      </div>
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
export default Wizard;