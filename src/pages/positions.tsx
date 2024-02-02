import { useState } from "react"
import { Link } from "react-router-dom";
const Positions = () => {
  const [isMore, setMore] = useState(false)
  const [isImportPosition, setImportPosition] = useState(false)
  const [isChooseToken, setChooseToken] = useState(false)

  const handleChooseToken = () => {
    setChooseToken(!isChooseToken);
  };
  const handleMore = () => {
    setMore(!isMore);
  };
  const handleImportPosition = () => {
    setImportPosition(!isImportPosition);
  };

  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <div className="md:flex items-center mb-[136px]">
          <div className="mr-auto mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <i className="lineax-mapker text-gradient mr-3 text-[26px]"></i>
              <h1 className="md:text-[32px] inline-block text-gradient">Positions</h1>
            </div>
            <p className="text-color2">Put your assets to work. Deposit to liquidity pools to earn.</p>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button onClick={handleMore} className="py-2.5 px-5 font-medium text-[16px] h-[40px] border border-color text-color bg-none hover:bg-none">
                More
                <i className="lineax-chevron-down ml-2 text-[14px]"></i>
              </button>
              {isMore &&
                <div className="absolute bg-popup rounded-xl p-4 w-[190px] right-0 top-[calc(100%_+_20px)]">
                  <div onClick={handleImportPosition} className="flex items-center font-medium text-white cursor-pointer mb-4">
                    <p className="mr-auto">Import position</p>
                    <i className="lineax-add-filled text-[20px]"></i>
                  </div>
                  <a href="#" target="_blank" className="flex items-center font-medium text-white cursor-pointer">
                    <span className="mr-auto">Learn</span>
                    <i className="lineax-learn-more text-[20px]"></i>
                  </a>
                </div>
              }
            </div>
            <Link to={"/wizard"} className="btn py-2.5 px-5 font-medium text-[16px] h-[40px] ml-4">
              New position
              <span className="ml-2 ">+</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <img className="mx-auto mb-4" src="/images/archive-box.svg" alt="archive-box" />
          <p className="md:text-[18px] font-medium text-primary mb-4">No liquidity position found</p>
          <p className="mb-4 text-white">Create a new position to get started.</p>
          <Link to={"/wizard"} className="btn btn-outline w-[230px] py-2.5 mx-auto">
            New position
            <i className="lineax-arrow-small-right ml-2.5"></i>
          </Link>
        </div>
        {isImportPosition &&
          <div className="flex items-center justify-center fixed z-[10] h-full w-full top-0 left-0">
            <div className="mx-[15px] bg-popup rounded-xl md:p-8 p-5 relative w-full sm:w-[630px] overflow-y-auto z-[1] flex flex-col ">
              <div className="flex items-center mb-4">
                <p className="mr-auto font-semibold text-white">Inport Posittion</p>
                <i onClick={handleImportPosition} className="lineax-mark text-[14px] cursor-pointer hover:text-primary"></i>
              </div>
              <p className="mb-5">Select tokens the pool comprises to import.</p>
              <div onClick={handleChooseToken} className="flex items-center p-4 border-border border rounded-xl cursor-pointer mb-5">
                <div className="flex items-center mr-auto">
                  <img className="mr-2 w-[20px]" src="/images/eth.png" alt="ETH" />
                  <span className="text-color font-normal">ETH</span>
                </div>
                <i className="lineax-chevron-down text-[12px]"></i>
              </div>
              <div className="flex items-center p-4 border-border border rounded-xl cursor-pointer mb-5">
                <div className="flex items-center mr-auto">
                  <img className="mr-2 w-[20px]" src="/images/usdc.png" alt="USDC" />
                  <span className="text-color font-normal">USDC</span>
                </div>
                <i className="lineax-chevron-down text-[12px]"></i>
              </div>
              <p className="text-center text-primary mb-5">Your position has been imported successfully</p>
              <button className="w-full mb-8">Import</button>
              <div className="flex items-center justify-end">
                <a className="text-white mr-auto hover:text-primary" href="#" target="_blank" rel="noopener noreferrer">Learn on Odyssey</a>
                <a className="text-white hover:text-primary" href="#" target="_blank" rel="noopener noreferrer">Join our Discord</a>
              </div>
            </div>
            <div onClick={handleImportPosition} className="top-0 left-0 bg-[rgba(0,0,0,0.6)] absolute h-full w-full content-[''] cursor-pointer"></div>
          </div>
        }
      </div>
      {isChooseToken &&
        <div className="flex items-center justify-center fixed z-[2] h-full w-full top-0 left-0">
          <div className="mx-[15px] bg-popup rounded-xl p-4 relative w-full sm:w-[630px] h-[600px] overflow-y-auto z-[1] flex flex-col text-white">
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
        </div>
      }
    </>
  )
}
export default Positions;