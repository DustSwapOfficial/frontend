import { useState } from "react"
const Earnings = () => {
  const [isMore, setMore] = useState(false)
  const handleMore = () => {
    setMore(!isMore);
  };
  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <div className="flex items-center mb-2">
          <div className="mr-auto">
            <div className="flex items-center">
              <i className="lineax-earnings text-gradient mr-3 text-[26px]"></i>
              <h1 className="md:text-[32px] inline-block text-gradient">Earnings</h1>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <span className="pr-4 mr-auto">Claimable</span>
            <div className="switch h-[28px]">
              <input type="checkbox" id="switch" />
              <label htmlFor="switch"></label>
            </div>
          </div>
        </div>
        <p className="text-color2 mb-5">View your liquidity earnings and manage earned rewards.</p>
        <div className="md:flex md:-mx-2.5 pb-[60px]">
          <div className="md:flex-[0_0_33.3333%] md:max-w-[33.33333%] md:px-2.5 mb-5 md:mb-0">
            <div className="rounded-xl bg-popup lg:p-8 p-4 shadow-[0_4px_0_0_#FFA422] bg-shadow relative">
              <p className="text-white font-medium text-[18px] mb-1 relative">$0</p>
              <p className="text-[14px] text-color2 relative">My Liquidity Value</p>
            </div>
          </div>
          <div className="md:flex-[0_0_33.3333%] md:max-w-[33.33333%] md:px-2.5 mb-5 md:mb-0">
            <div className="rounded-xl bg-popup lg:p-8 p-4 shadow-[0_4px_0_0_#FFA422] bg-shadow relative">
              <p className="text-white font-medium text-[18px] relative mb-1">-</p>
              <p className="text-[14px] text-color2 relative">My Total APR</p>
            </div>
          </div>
          <div className="md:flex-[0_0_33.3333%] md:max-w-[33.33333%] md:px-2.5">
            <div className="rounded-xl bg-popup lg:p-8 p-4 shadow-[0_4px_0_0_#FFA422] bg-shadow relative">
              <p className="text-white font-medium text-[18px] mb-1 relative">-</p>
              <p className="text-[14px] text-color2 relative">Claimable Rewards</p>
            </div>
          </div>
        </div>
        <h3 className="pb-8">My positions</h3>
        <div className="md:flex md:-mx-2.5">
          <div className="md:flex-[0_0_66.6667%] md:max-w-[66.6667%] md:px-2.5 mb-5 md:mb-0 basis-full">
            <div className="h-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Pool</th>
                    <th>My APR</th>
                    <th>
                      <span className="text-gradient">My Deposit</span>
                      <i className="lineax-arrow-small-down ml-2 text-gradient"></i>
                    </th>
                    <th>Claimable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      5.6%
                    </td>
                    <td>
                      5.6%
                    </td>
                    <td>$44.2B</td>
                    <td>5.6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center pt-8">No pools to see</p>
          </div>
          <div className="md:flex-[0_0_33.3333%] md:max-w-[33.33333%] md:px-2.5 basis-full">
            <div className="bg-popup rounded-xl p-4 h-full">
              <p className="font-medium mb-3 text-white">Claim rewards</p>
              <p>Select pools you want to claim rewards.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Earnings;